import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [MatCardModule,
            MatDividerModule,
          CommonModule,
          RouterModule,
          MatFormFieldModule,
          FormsModule,
          MatIconModule,
          ReactiveFormsModule,
          MatInputModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    products: any[] = [];
    searchProductForm !: FormGroup;
    constructor(private adminService: AdminService,
      private fb : FormBuilder,
      private snackbar : MatSnackBar) {
    }

    ngOnInit() {
      this.getAllProducts();
      this.searchProductForm = this.fb.group({
        title: [null, [Validators.required]]
      });
    }

    getAllProducts(){
      this.products = [];
      this.adminService.getAllProducts().subscribe(res => {
        res.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
          this.products.push(element);
        });
      });
    }

    submitForm(){
      this.products = [];
      const title = this.searchProductForm.get('title')!.value;
      this.adminService.getAllProductsByName(title).subscribe(res => {
        res.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
          this.products.push(element);
        });
      });
    }

    deleteProduct(productId:any){
      this.adminService.deleteProduct(productId).subscribe(res => {
        if(res == null) {
          this.snackbar.open("Product deleted successfully", 'Close',{
            duration : 5000
          });

          this.getAllProducts();
        } else {
          this.snackbar.open(res.message, 'Close', {
            duration : 5000,
            panelClass : 'error-snackbar'
          })
        }
      })
    }
}
