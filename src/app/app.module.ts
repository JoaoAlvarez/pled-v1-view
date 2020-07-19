/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */


import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CoreModule } from "./@core/core.module";
import { ThemeModule } from "./@theme/theme.module";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AuthGuard } from "./auth-guard.service";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { environment } from "../environments/environment";
import { NgxMaskModule } from 'ngx-mask';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ColorSketchModule } from 'ngx-color/sketch';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';

import {
  NbPasswordAuthStrategy,
  NbAuthModule,
  NbAuthJWTToken,
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
  NbAuthJWTInterceptor,
} from "@nebular/auth";
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from "@nebular/theme";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    FlatpickrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbEvaIconsModule,
    NgxMaskModule.forRoot(),
    SweetAlert2Module.forRoot(),
    ColorSketchModule,
    NbChatModule.forRoot({
      messageGoogleMapKey: "AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY",
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: "email",
          baseEndpoint: environment.url,
          token: {
            class: NbAuthJWTToken,
            key: "token",
          },
          login: {
            endpoint: "/user/signin",
            requireValidToken: false,
            redirect: {
              success: "/",
              failure: null,
            },
          },
          register: {
            endpoint: "/user/signup/validate",
            requireValidToken: false,
            redirect: {
              success: "/",
              failure: null,
            },
          },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
          //strategy: "username", // strategy id key.
          rememberMe: false, // whether to show or not the `rememberMe` checkbox
        },
        validation: {
          password: {
            required: true,
            minLength: 3,
            maxLength: 50,
          },
          email: {
            required: true,
          },
        },
      },
    }),
  ],
  providers: [
    AuthGuard,
    {
      provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
      useValue: function () {
        return false;
      },
    },
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
