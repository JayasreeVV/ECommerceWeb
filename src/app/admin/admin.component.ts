import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DemoAngularMaterialModule } from '../DemoAngularMaterialModule';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  DemoAngularMaterialModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
