import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DisciplinasComponent } from './disciplinas.component';
import { DisciplinasListarComponent } from './listar/disciplinas.component';
import { DisciplinasEditarComponent } from './editar/editar.component';
import { DisciplinasCadastrarComponent } from './cadastrar/cadastrar.component';
const routes: Routes = [
    {
        path: "",
        component: DisciplinasComponent,
        children: [
            { path: "", redirectTo: "listar", pathMatch: "full" },
            {
                path: "listar",
                component: DisciplinasListarComponent
            },
            {
                path: "editar/:_id",
                component: DisciplinasEditarComponent
            },
            {
                path: "cadastrar",
                component: DisciplinasCadastrarComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsuariosRoutingModule { }

export const routedComponents = [
    DisciplinasComponent,
    DisciplinasListarComponent,
    DisciplinasEditarComponent,
    DisciplinasCadastrarComponent

];
