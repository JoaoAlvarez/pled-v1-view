import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { NgxAuthRoutingModule } from "./auth-routing.module";
import { NbAuthModule } from "@nebular/auth";
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbSpinnerModule,
  NbCardModule
} from "@nebular/theme";

import { NgxLoginComponent } from "./login/login.component";
import { SignupComponent } from './signup/signup.component';
import { RecoverPasswordComponent } from './recover/recover.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbCardModule,
    NgxAuthRoutingModule,
    ReactiveFormsModule,
    NbAuthModule,
    NbSpinnerModule,
  ],
  declarations: [NgxLoginComponent, RecoverPasswordComponent, SignupComponent],
})
export class NgxAuthModule { }
