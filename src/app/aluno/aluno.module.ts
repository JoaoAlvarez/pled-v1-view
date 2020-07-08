import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  NbCalendarModule,
  NbCalendarRangeModule,
  NbLayoutModule,
} from "@nebular/theme";

import { NgxMaskModule } from 'ngx-mask';
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ThemeModule } from "../@theme/theme.module";
import { ReactiveFormsModule } from '@angular/forms';
import { MiscellaneousModule } from "../miscellaneous/miscellaneous.module";

import { AlunoRoutingModule, routedComponents } from './aluno-routing.module';
import { AlunoComponent } from './aluno.component';

@NgModule({
  declarations: [AlunoComponent, ...routedComponents],
  imports: [
    CommonModule,
    AlunoRoutingModule,
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
    ThemeModule,
    NbMenuModule,
    ReactiveFormsModule,
    MiscellaneousModule,
    NbLayoutModule
  ]
})
export class AlunoModule { }
