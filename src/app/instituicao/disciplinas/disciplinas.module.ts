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

import { ThemeModule } from "../../@theme/theme.module";
import {
  UsuariosRoutingModule,
  routedComponents,
} from "./disciplinas-routing.module";

import { ColorSketchModule } from 'ngx-color/sketch';


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
    UsuariosRoutingModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    NgxMaskModule,
    NbSpinnerModule,
    ColorSketchModule
  ],
  declarations: [...routedComponents],
})
export class DisciplinasModule { }