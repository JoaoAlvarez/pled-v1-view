import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfessoresComponent } from './professores.component';
import { ProfessoresListarComponent } from './listar/professores.component';
import { ProfessoresAdicionarComponent } from './adicionar/adicionar.component';
const routes: Routes = [
    {
        path: "",
        component: ProfessoresComponent,
        children: [
            {
                path: "", redirectTo: "listar", pathMatch: "full"
            },
            {
                path: "listar",
                component: ProfessoresListarComponent,
            },
            {
                path: "adicionar",
                component: ProfessoresAdicionarComponent,
            },

        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsuariosRoutingModule { }

export const routedComponents = [
    ProfessoresComponent,
    ProfessoresListarComponent,
    ProfessoresAdicionarComponent
];
