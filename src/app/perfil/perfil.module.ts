import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule, routedComponents } from './perfil-routing.module';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from '../miscellaneous/miscellaneous.module';


@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    PerfilRoutingModule
  ],
  declarations: [...routedComponents]
})
export class PerfilModule { }
