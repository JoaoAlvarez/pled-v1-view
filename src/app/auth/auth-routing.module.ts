import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NbAuthComponent } from "@nebular/auth";

import { NgxLoginComponent } from "./login/login.component";
import { NbLogoutComponent } from "@nebular/auth";
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  {
    path: "",
    component: NbAuthComponent,
    children: [
      {
        path: "login",
        component: NgxLoginComponent,
      },
      {
        path: "logout",
        component: NbLogoutComponent,
      },
      {
        path: "signup/:id",
        component: SignupComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule { }
