import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlunoComponent } from './aluno.component';
import { NotFoundComponent } from "../miscellaneous/not-found/not-found.component";
import { HomeComponent } from './home/home.component';
import { SalaComponent } from './sala/sala.component';
import { AtividadeComponent } from './atividade/atividade.component';
import { DisciplinaComponent } from './disciplina/disciplina.component';


const routes: Routes = [
  {
    path: '', component: AlunoComponent,
    children: [
      {
        path: 'turma/:id',
        component: HomeComponent
      },
      {
        path: 'sala/:id',
        component: SalaComponent
      },
      {
        path: 'atividade/:id/:turmaid',
        component: AtividadeComponent
      },
      {
        path: 'disciplina/:id/:turmaid',
        component: DisciplinaComponent
      },
      {
        path: "",
        redirectTo: "turma",
        pathMatch: "full",
      },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunoRoutingModule { }
export const routedComponents = [
  AlunoComponent,
  HomeComponent,
  AtividadeComponent,
  SalaComponent,
  DisciplinaComponent,
];

