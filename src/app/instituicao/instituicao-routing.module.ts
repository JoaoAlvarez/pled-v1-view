import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { InstituicaoComponent } from './instituicao.component';
import { NotFoundComponent } from "../miscellaneous/not-found/not-found.component";

import { AuthGuard } from "../auth-guard.service";


const routes: Routes = [{
  path: "",
  component: InstituicaoComponent,
  children: [
    // {
    //   path: "usuarios",
    //   loadChildren: () => import("./usuarios/alunos/alunos.module").then((m) => m.AlunosModule)
    // },

    {
      path: "",
      redirectTo: "usuarios/alunos",
      pathMatch: "full",
    },
    {
      path: "usuarios/professores",
      loadChildren: () => import("./usuarios/professores/professores.module").then((m) => m.ProfessoresModule)
    },
    {
      path: "usuarios/alunos",
      loadChildren: () => import("./usuarios/alunos/alunos.module").then((m) => m.AlunosModule)
    },
    {
      path: "turmas",
      loadChildren: () => import("./turmas/turmas.module").then((m) => m.TurmasModule)
    },
    {
      path: "disciplinas",
      loadChildren: () => import("./disciplinas/disciplinas.module").then((m) => m.DisciplinasModule)
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
export class InstituicaoRoutingModule { }
export const routedComponents = [
  InstituicaoComponent
];
