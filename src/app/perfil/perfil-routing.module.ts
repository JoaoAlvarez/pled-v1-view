import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilComponent } from './perfil.component';
import { MeusdadosComponent } from './meusdados/meusdados.component';
import { SenhaComponent } from './senha/senha.component';
import { NotFoundComponent } from "../miscellaneous/not-found/not-found.component";


const routes: Routes = [{
  path: "",
  component: PerfilComponent,
  children: [
    {
      path: "",
      redirectTo: "meusdados",
      pathMatch: "full",
    },
    {
      path: "meusdados",
      component: MeusdadosComponent
    },
    {
      path: "senha",
      component: SenhaComponent
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
  MeusdadosComponent,
  SenhaComponent
];
