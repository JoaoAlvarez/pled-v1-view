import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
  NbAccordionModule,
  NbSpinnerModule,
  NbCalendarModule,
  NbCalendarRangeModule,
  NbSidebarModule,
  NbTabsetModule,
  NbBadgeModule

} from "@nebular/theme";
import { NgxMaskModule } from 'ngx-mask';
import { Ng2SmartTableModule } from "ng2-smart-table";

import { ThemeModule } from "../@theme/theme.module";
import { ReactiveFormsModule } from '@angular/forms';

import { ProfessorRoutingModule, routedComponents } from './professor-routing.module';
import { ProfessorComponent } from './professor.component';
import { MiscellaneousModule } from "../miscellaneous/miscellaneous.module";
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

import { DragDropModule } from '@angular/cdk/drag-drop';


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
    FormsModule,
    FlatpickrModule,
    Ng2FlatpickrModule,
    NbAccordionModule,
    DragDropModule,
    NbSidebarModule,
    NbTabsetModule,
    NbBadgeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ProfessorModule { }