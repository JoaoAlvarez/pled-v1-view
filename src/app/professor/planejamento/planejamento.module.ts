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
  NbUserModule,
  NbSpinnerModule
} from "@nebular/theme";

import { NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from "ng2-smart-table";

import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';

import { ThemeModule } from "../../@theme/theme.module";
import {
  PlanejamentoRoutingModule,
  routedComponents,
} from "./planejamento-routing.module";

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
    PlanejamentoRoutingModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    NgxMaskModule,
    NbSpinnerModule,
    FormsModule,
    FlatpickrModule
  ],
  declarations: [...routedComponents],
})
export class PlanejamentoModule { }
