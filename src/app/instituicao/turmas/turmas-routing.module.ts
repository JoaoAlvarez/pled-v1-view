import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TurmasComponent } from './turmas.component';
import { TurmasListarComponent } from './listar/turmas.component';
import { TurmasCadastrarComponent } from './cadastrar/cadastrar.component';
import { TurmasEditarComponent } from './editar/editar.component';
const routes: Routes = [
    {
        path: "",
        component: TurmasComponent,
        children: [
            { path: "", redirectTo: "listar", pathMatch: "full" },
            {
                path: "listar",
                component: TurmasListarComponent
            },
            {
                path: "cadastrar",
                component: TurmasCadastrarComponent
            },
            {
                path: "editar/:id",
                component: TurmasEditarComponent
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
    TurmasComponent,
    TurmasListarComponent,
    TurmasCadastrarComponent,
    TurmasEditarComponent
];
