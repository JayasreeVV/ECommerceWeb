import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterOutlet, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserStorageService } from '../service/storage/user-storage.service';
import { AdminComponent } from '../admin/admin.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    RouterOutlet,
    AdminComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
loginForm!: FormGroup;
hidePassword = true;
constructor ( private formBuilder: FormBuilder,
  private authService: AuthService,
  private snackBar: MatSnackBar,
  private router: Router
){}

ngOnInit() : void {
  this.loginForm = this.formBuilder.group({
    email : [null, [Validators.required, Validators.email]],
    password : [null, [Validators.required]],
  })
}

togglePasswordVisibility() {
  this.hidePassword = !this.hidePassword;
}

onSubmit() : void {
    const userName = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(userName, password).subscribe({
      next : (response) => {
        if(UserStorageService.isAdminLoggedIn()){
          this.router.navigateByUrl('admin/dashboard');
        } else if(UserStorageService.isCustomerLoggedIn()) {
          this.router.navigateByUrl('customer/dashboard');
        }
          // this.snackBar.open('Login successfull!', 'Ok', {duration : 5000 });
      },
      error : (error) => {
          this.snackBar.open('Bad credentials', 'ERROR', {duration : 5000 });
      }
    });
  }

  
  redirect() : void {
    this.router.navigateByUrl("/register")
  }
}



export const routes: Routes = [
  { path : 'register', component: SignupComponent }
];
