import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ThemeModule } from "../@theme/theme.module";


@NgModule({
  imports: [
    CommonModule,
    ThemeModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
