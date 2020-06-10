import { NgModule } from '@angular/core';
import { NbMenuModule } from "@nebular/theme";

import { ThemeModule } from "../@theme/theme.module";

import { InstituicaoRoutingModule } from './instituicao-routing.module';
import { InstituicaoComponent } from './instituicao.component';
import { MiscellaneousModule } from "../miscellaneous/miscellaneous.module";


@NgModule({
  declarations: [InstituicaoComponent],
  imports: [
    InstituicaoRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule
  ]
})
export class InstituicaoModule { }
