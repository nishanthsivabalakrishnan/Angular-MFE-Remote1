import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Export_Routes } from './routes';
import { RegisterComponent } from '../Views/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../Views/login/login.component';
import { AngularMaterialModule } from '../Imports/angular-material.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(Export_Routes),
    AngularMaterialModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})
export class ExportModule { }