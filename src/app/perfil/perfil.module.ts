import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule, routedComponents } from './perfil-routing.module';
import { NbButtonModule, NbCardModule, NbInputModule, NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from '../miscellaneous/miscellaneous.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    PerfilRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule,
    NbButtonModule,
    NbInputModule,
    NbCardModule,

  ],
  declarations: [...routedComponents]
})
export class PerfilModule { }
