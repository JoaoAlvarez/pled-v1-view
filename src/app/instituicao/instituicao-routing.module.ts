import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { InstituicaoComponent } from './instituicao.component';
import { NotFoundComponent } from "../miscellaneous/not-found/not-found.component";
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
