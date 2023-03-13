import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Export_Routes } from './Export/routes';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(Export_Routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
