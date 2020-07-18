import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanejamentoComponent } from './planejamento.component';
import { CriarComponent } from './criar/criar.component';


const routes: Routes = [{
  path: "",
  component: PlanejamentoComponent,
  children: [
    { path: "", redirectTo: "criar", pathMatch: "full" },
    {
      path: "criar",
      component: CriarComponent
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
  CriarComponent
];
