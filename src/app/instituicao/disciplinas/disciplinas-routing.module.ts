import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DisciplinasComponent } from './disciplinas.component';
const routes: Routes = [
    {
        path: "",
        component: DisciplinasComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsuariosRoutingModule { }

export const routedComponents = [
    DisciplinasComponent,
];
