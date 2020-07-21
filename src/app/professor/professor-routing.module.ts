import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProfessorComponent } from './professor.component';
import { NotFoundComponent } from "../miscellaneous/not-found/not-found.component";

import { CriarComponent } from './simulados/criar/criar.component';

import { AuthGuard } from "../auth-guard.service";


const routes: Routes = [{
  path: "",
  component: ProfessorComponent,
  children: [
    {
      path: "",
      redirectTo: "atividades",
      pathMatch: "full",
    },
    {
      path: "atividades",
      loadChildren: () => import("./simulados/simulados.module").then((m) => m.SimuladosModule)
    },
    {
      path: "atividades/criar",
      component: CriarComponent,
    },
    {
      path: "turmas",
      loadChildren: () => import("./turmas/turmas.module").then((m) => m.TurmasModule)
    },
    {
      path: "materiais",
      loadChildren: () => import("./materiais/materiais.module").then((m) => m.MateriaisModule)
    },
    {
      path: "planejamento",
      loadChildren: () => import("./planejamento/planejamento.module").then((m) => m.PlanejamentoModule)
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
export class ProfessorRoutingModule { }
export const routedComponents = [
  ProfessorComponent,
  CriarComponent,
];
