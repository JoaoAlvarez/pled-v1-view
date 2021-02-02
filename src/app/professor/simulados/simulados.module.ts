import { NgModule } from "@angular/core";
import {
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
  NbAccordionModule,
  NbUserModule,
  NbSpinnerModule,
  NbCalendarRangeModule,
} from "@nebular/theme";

import { NgxMaskModule } from 'ngx-mask';


import { ReactiveFormsModule } from '@angular/forms';


import { Ng2SmartTableModule } from "ng2-smart-table";

import { ThemeModule } from "../../@theme/theme.module";
import {
  SimuladosRoutingModule,
  routedComponents,
} from "./simulados-routing.module";

import { DragDropModule } from '@angular/cdk/drag-drop';
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";



@NgModule({
  imports: [
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
    SimuladosRoutingModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    NgxMaskModule,
    NbSpinnerModule,
    NbCalendarRangeModule,
    NbAccordionModule,
    DragDropModule,
    CKEditorModule
  ],
  declarations: [...routedComponents],
})
export class SimuladosModule { }
export class PageModule { }