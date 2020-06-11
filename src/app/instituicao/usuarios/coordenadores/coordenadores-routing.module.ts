import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CoordenadoresComponent } from './coordenadores.component';
const routes: Routes = [
    {
        path: "",
        component: CoordenadoresComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsuariosRoutingModule { }

export const routedComponents = [
    CoordenadoresComponent,
];
