import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { AdminComponent } from "./admin.component";
import { NotFoundComponent } from "../miscellaneous/not-found/not-found.component";
import { AuthGuard } from "../auth-guard.service";


const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [

      {
        path: "instituicoes",
        loadChildren: () =>
          import("./instituicoes/instituicoes.module").then(
            (m) => m.instituicoesModule
          )
      },
      {
        path: "usuarios",
        loadChildren: () => import("./usuarios/usuarios.module").then((m) => m.UsuariosModule)
      },
      {
        path: "",
        redirectTo: "instituicoes",
        pathMatch: "full",
      },
      {
        path: "**",
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
