import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { InstituicaoComponent } from './instituicao.component';
import { NotFoundComponent } from "../miscellaneous/not-found/not-found.component";

import { AdicionarComponent } from './usuarios/adicionar/adicionar.component';

import { AdicionarAlunoComponent } from './usuarios/adicionaraluno/adicionar.component';

import { EditarAlunoComponent } from './usuarios/editaraluno/editar.component';

import { CadastrarComponent } from './turmas/cadastrar/cadastrar.component';

import { CadastroComponent } from './disciplinas/cadastrar/cadastrar.component';

import { AuthGuard } from "../auth-guard.service";


const routes: Routes = [{
  path: "",
  component: InstituicaoComponent,
  children: [
    {
      path: "usuarios",
      loadChildren: () => import("./usuarios/alunos/alunos.module").then((m) => m.AlunosModule)
    },

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
      path: "usuarios/adicionar",
      component: AdicionarComponent,
    },
    {
      path: "usuarios/adicionaraluno",
      component: AdicionarAlunoComponent,
    },
    {
      path: "usuarios/editaraluno/:id",
      component: EditarAlunoComponent,
    },
    {
      path: "turmas/cadastrar",
      component: CadastrarComponent,
    },
    {
      path: "turmas",
      loadChildren: () => import("./turmas/turmas.module").then((m) => m.TurmasModule)
    },

    {
      path: "disciplinas/cadastrar",
      component: CadastroComponent,
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
  InstituicaoComponent,
  AdicionarComponent,
  AdicionarAlunoComponent,
  EditarAlunoComponent,
  CadastrarComponent,
  CadastroComponent
];
