import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-post-product',
  standalone: true,
  imports: [CommonModule,
            FormsModule,
            MatInputModule,
            MatOptionModule,
            MatIconModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatSelectModule
            ],
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.scss'
})
export class PostProductComponent {
 productForm : FormGroup;
 listOfCategories : any = [];
 selectedFile : File | null;
 imagePreview: string | ArrayBuffer | null;

 constructor( 
  private fb : FormBuilder,
  private router : Router,
  private snackbar : MatSnackBar,
  private adminService : AdminService
 ){}

 onFileSelected(event : any) {
  this.selectedFile = event.target.files[0];
  this.previewImage();
 }

 previewImage() {
  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result;  
  }
  reader.readAsDataURL(this.selectedFile);
 }

 ngOnInit() : void {
    this.productForm = this.fb.group({
      categoryId : [null, [Validators.required]],
      name : [null, [Validators.required]],
      price : [null, [Validators.required]],
      description : [null, [Validators.required]]
  });
    this.getAllCategories();
 }

 getAllCategories() {
  this.adminService.getAllCategories().subscribe(res => {
    this.listOfCategories = res;

  })
 }

 addProduct() : void {
  if(this.productForm.valid) {
      const formData: FormData = new FormData();
      formData.append('img', this.selectedFile);
      formData.append('categoryId', this.productForm.get('categoryId').value);
      formData.append('name', this.productForm.get('name').value);
      formData.append('description', this.productForm.get('description').value);
      formData.append('price', this.productForm.get('price').value);

      this.adminService.addProduct(formData).subscribe((res) => {
        if(res.id != null) {
          this.snackbar.open('Product posted successfully!', 'Close', {
            duration : 5000
          });
          this.router.navigateByUrl('/admin/dashboard');
        } else{
          this.snackbar.open(res.message, 'ERROR', {
            duration : 5000
          });
        }
      })
  } else {
    for(const i in this.productForm.controls) {
      this.productForm.controls[i].markAsDirty();
      this.productForm.controls[i].updateValueAndValidity();
    }
  }
 }

}
