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
  NbCalendarModule,
  NbCalendarRangeModule,
} from "@nebular/theme";
import { NgxMaskModule } from 'ngx-mask';
import { Ng2SmartTableModule } from "ng2-smart-table";

import { ThemeModule } from "../@theme/theme.module";
import { ReactiveFormsModule } from '@angular/forms';

import { ProfessorRoutingModule, routedComponents } from './professor-routing.module';
import { ProfessorComponent } from './professor.component';
import { MiscellaneousModule } from "../miscellaneous/miscellaneous.module";

@NgModule({
  declarations: [ProfessorComponent, ...routedComponents],
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
    ProfessorRoutingModule,
    ThemeModule,
    NbMenuModule,
    ReactiveFormsModule,
    MiscellaneousModule,
    NbCalendarModule,
    NbCalendarRangeModule,
  ],
})
export class ProfessorModule { }
export class PageModule { }
