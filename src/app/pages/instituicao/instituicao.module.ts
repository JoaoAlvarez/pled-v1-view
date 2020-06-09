import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstituicaoRoutingModule } from './instituicao-routing.module';
import { InstituicaoComponent } from './instituicao.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


@NgModule({
  declarations: [InstituicaoComponent, UsuariosComponent],
  imports: [
    CommonModule,
    InstituicaoRoutingModule
  ]
})
export class InstituicaoModule { }
