import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TurmasComponent } from './turmas.component';

const routes: Routes = [{ path: '', component: TurmasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurmasRoutingModule { }
export const routedComponents = [
  TurmasComponent,
];
