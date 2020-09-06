import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProfessorComponent } from './professor.component';
import { NotFoundComponent } from "../miscellaneous/not-found/not-found.component";

import { CriarComponent } from './simulados/criar/criar.component';
import { AtividadeComponent } from './atividade/atividade.component';
import { HomeComponent } from './home/home.component';
import { SalaComponent } from './sala/sala.component';


const routes: Routes = [{
  path: "",
  component: ProfessorComponent,
  children: [
    {
      path: 'home/:id',
      component: HomeComponent
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
      path: 'atividade/:id',
      component: AtividadeComponent
    },
    {
      path: 'sala/:id',
      component: SalaComponent
    },
    {
      path: "",
      redirectTo: "home",
      pathMatch: "full",
    }

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
  AtividadeComponent,
  HomeComponent,
  SalaComponent
];
