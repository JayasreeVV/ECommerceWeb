import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,
            MatCardModule,
            FormsModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatIconModule,
            HttpClientModule,
            MatFormFieldModule,
            MatInputModule
            ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder,
                private snackBar : MatSnackBar,
                private authService : AuthService,
                private router : Router
              ){

    }

    ngOnInit() : void {
      this.signupForm = this.fb.group({
        name : [null, [Validators.required]],
        email : [null, [Validators.required, Validators.email]],
        password : [null, [Validators.required]],
        confirmpassword : [null, [Validators.required]]
      })
    }

    togglePasswordVisibility() {
      this.hidePassword = !this.hidePassword;
    }

    onSubmit() : void {
        const password = this.signupForm.get('password')?.value;
        const confirmpassword = this.signupForm.get('confirmpassword')?.value;

        if(password != confirmpassword) {
          this.snackBar.open('Password does not match', 'Close', {duration : 5000, panelClass : 'error-snackbar' });
          return;
        }

        this.authService.register(this.signupForm.value).subscribe({
          next : (response) => {
              this.snackBar.open('Sign up successfull!', 'Close', {duration : 5000 });
              this.router.navigateByUrl("/login");

          },
          error : (error) => {
              this.snackBar.open('Sign up failed, Please try again', 'Close', {duration : 5000, panelClass : 'error-snackbar'});
          }
        });
    }

  }


