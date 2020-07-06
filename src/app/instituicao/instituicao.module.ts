import { NgModule } from '@angular/core';
import {
  NbMenuModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbTreeGridModule,
  NbButtonModule,
  NbActionsModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbSpinnerModule,
} from "@nebular/theme";
import { NgxMaskModule } from 'ngx-mask';
import { Ng2SmartTableModule } from "ng2-smart-table";

import { ThemeModule } from "../@theme/theme.module";
import { ReactiveFormsModule } from '@angular/forms';

import { InstituicaoRoutingModule, routedComponents } from './instituicao-routing.module';
import { InstituicaoComponent } from './instituicao.component';
import { MiscellaneousModule } from "../miscellaneous/miscellaneous.module";

@NgModule({
  declarations: [InstituicaoComponent, ...routedComponents],
  imports: [
    NbSelectModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbActionsModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    ThemeModule,
    NbButtonModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    NgxMaskModule,
    NbSpinnerModule,
    InstituicaoRoutingModule,
    ThemeModule,
    NbMenuModule,
    ReactiveFormsModule,
    MiscellaneousModule,
  ],
})
export class InstituicaoModule { }