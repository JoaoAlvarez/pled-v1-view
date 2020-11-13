import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilComponent } from './perfil.component';
import { NotFoundComponent } from "../miscellaneous/not-found/not-found.component";
import { MeusdadosComponent } from './meusdados/meusdados.component';


const routes: Routes = [{
  path: "",
  component: PerfilComponent,
  children: [
    {
      path: "meusdados",
      component: MeusdadosComponent
    },
    {
      path: "**",
      component: NotFoundComponent,
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
export const routedComponents = [
  PerfilComponent,
  MeusdadosComponent
];
