import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { instituicoesComponent } from "./instituicoes.component";
import { instituicoesListarComponent } from "./listar/instituicoes.listar.component";
import { instituicoesEditarComponent } from "./editar/editar.component";
import { instituicoesAdicionarComponent } from './adicionar/adicionar.component';
const routes: Routes = [
  {
    path: "",
    component: instituicoesComponent,
    children: [
      { path: "", redirectTo: "listar", pathMatch: "full" },
      {
        path: "listar",
        component: instituicoesListarComponent,
      },
      {
        path: "editar/:id",
        component: instituicoesEditarComponent,
      },
      {
        path: "adicionar",
        component: instituicoesAdicionarComponent,
      }
    ],

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class instituicoesRoutingModule { }

export const routedComponents = [
  instituicoesComponent,
  instituicoesListarComponent,
  instituicoesEditarComponent,
  instituicoesAdicionarComponent
];
