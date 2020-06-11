import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { InstituicaoComponent } from './instituicao.component';
import { NotFoundComponent } from "../miscellaneous/not-found/not-found.component";
//import { AlunosComponent } from './usuarios/alunos/usuarios.component';
import { AdicionarComponent } from './usuarios/adicionar/adicionar.component';
import { AuthGuard } from "../auth-guard.service";


const routes: Routes = [{
  path: "",
  component: InstituicaoComponent,
  children: [
    {
      path: "usuarios",
      loadChildren: () => import("./usuarios/usuarios.module").then((m) => m.UsuariosModule)
    },

    {
      path: "",
      redirectTo: "usuarios",
      pathMatch: "full",
    },
    {
      path: "usuarios/coordenadores",
      loadChildren: () => import("./usuarios/coordenadores/coordenadores.module").then((m) => m.CoordenadoresModule)
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
  AdicionarComponent
];
