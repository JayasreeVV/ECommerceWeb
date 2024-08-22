import { Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { PostCategoryComponent } from './admin/components/post-category/post-category.component';
import { AppComponent } from './app.component';
import { PostProductComponent } from './admin/components/post-product/post-product.component';

export const routes: Routes = [
    { path : 'customer', component: CustomerComponent },
    { path : 'admin', component: AdminComponent },
    { path : 'login', component: LoginComponent },
    { path : 'register', component: SignupComponent },
    { path : 'admin/dashboard', component: DashboardComponent},
    { path : 'customer/dashboard', component: DashboardComponent},
    { path : 'api/admin/category', component: PostCategoryComponent},
    { path : 'admin/product', component: PostProductComponent}

];
