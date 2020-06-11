import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfessoresComponent } from './professores.component';
const routes: Routes = [
    {
        path: "",
        component: ProfessoresComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsuariosRoutingModule { }

export const routedComponents = [
    ProfessoresComponent,
];
