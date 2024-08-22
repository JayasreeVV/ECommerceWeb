import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DemoAngularMaterialModule } from './DemoAngularMaterialModule';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserStorageService } from './service/storage/user-storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports : [DemoAngularMaterialModule,
              AppComponent,
              RouterOutlet,
              RouterModule,
              MatCardModule,
              HttpClientModule,
              MatCardModule,
              FormsModule,
              MatFormFieldModule,
              CommonModule
            ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ECommerceWeb';

  isCustomerLoggedIn : boolean = UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn : boolean = UserStorageService.isAdminLoggedIn();

  constructor(private router : Router) {

  }

  ngOnInit() : void {
    this.router.events.subscribe( event => {
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
    })
  }

  logOut() {
    UserStorageService.signOut();
    this.router.navigateByUrl('/login');
  }
}
