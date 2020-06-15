import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SimuladosComponent } from './simulados.component';
const routes: Routes = [
    {
        path: "",
        component: SimuladosComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SimuladosRoutingModule { }

export const routedComponents = [
    SimuladosComponent,
];
