import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlunoComponent } from './aluno.component';
import { NotFoundComponent } from "../miscellaneous/not-found/not-found.component";
import { HomeComponent } from './home/home.component';
import { SalaComponent } from './sala/sala.component';


const routes: Routes = [
  {
    path: '', component: AlunoComponent,
    children: [
      {
        path: 'turma/:id',
        component: HomeComponent
      },
      {
        path: 'sala',
        component: SalaComponent
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
  HomeComponent
];

