import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "./auth-guard.service";
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
    canActivate: [AuthGuard],
    data: { roles: 'Administrador' }
  },
  {
    path: "instituicao",
    loadChildren: () =>
      import("./instituicao/instituicao.module").then((m) => m.InstituicaoModule),
    canActivate: [AuthGuard],
    data: { roles: 'Instituição' }
  },
  {
    path: "professor",
    loadChildren: () =>
      import("./professor/professor.module").then((m) => m.ProfessorModule),
    canActivate: [AuthGuard],
    data: { roles: ['Professor', 'Coordenador'] }
  },
  {
    path: 'aluno', loadChildren: () => import('./aluno/aluno.module').then(m => m.AlunoModule),
    canActivate: [AuthGuard],
    data: { roles: 'Aluno' }
  },
  {
    path: "auth",
    loadChildren: "./auth/auth.module#NgxAuthModule",
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", redirectTo: "home" },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
