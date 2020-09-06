import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanejamentoComponent } from './planejamento.component';
import { CriarComponent } from './criar/criar.component';
import { ListarComponent } from './listar/listar.component';
import { AvulsoComponent } from './avulso/avulso.component';


const routes: Routes = [{
  path: "",
  component: PlanejamentoComponent,
  children: [
    { path: "", redirectTo: "listar", pathMatch: "full" },
    {
      path: "criar",
      component: CriarComponent
    },
    {
      path: "listar",
      component: ListarComponent
    },
    {
      path: "criaraula",
      component: AvulsoComponent
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanejamentoRoutingModule { }

export const routedComponents = [
  PlanejamentoComponent,
  CriarComponent,
  ListarComponent,
  AvulsoComponent
];
