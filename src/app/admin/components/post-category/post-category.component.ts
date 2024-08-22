import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../service/admin.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-post-category',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule],
  templateUrl: './post-category.component.html',
  styleUrl: './post-category.component.scss'
})
export class PostCategoryComponent {
  categoryForm: FormGroup;

  constructor(
    private fb : FormBuilder,
    private router : Router,
    private snackbar : MatSnackBar,
    private adminService : AdminService
  ) {
  }

  ngOnInit(): void {
      this.categoryForm = this.fb.group({
        name : [null, [Validators.required]],
        description : [null, [Validators.required ]]
      })
  }

  addCategory() : void {
    if(this.categoryForm.valid) {
        this.adminService.addCategory(this.categoryForm.value).subscribe(
          (response) => {
            if(response.id != null) {
              this.snackbar.open('Category Posted Successfully', 'Close', {
                duration : 5000
              });
              this.router.navigateByUrl('/admin/dashboard');
            } else {
              this.snackbar.open(response.message, 'Close', {
                duration : 5000,
                panelClass : 'error-snackbar'
              });
            }
          }
        )
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }
}
