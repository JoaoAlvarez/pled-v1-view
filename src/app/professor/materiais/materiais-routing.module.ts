import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MateriaisComponent } from './materiais.component';
import { MateriaisListarComponent } from './listar/listar.component';
import { MateriaisEditarComponent } from './editar/editar.component';
import { MateriaisCadastrarComponent } from './cadastrar/cadastrar.component';
const routes: Routes = [
    {
        path: "",
        component: MateriaisComponent,
        children: [
            { path: "", redirectTo: "listar", pathMatch: "full" },
            {
                path: "listar",
                component: MateriaisListarComponent
            },
            {
                path: "editar/:_id",
                component: MateriaisEditarComponent
            },
            {
                path: "cadastrar",
                component: MateriaisCadastrarComponent
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
    MateriaisComponent,
    MateriaisListarComponent,
    MateriaisEditarComponent,
    MateriaisCadastrarComponent

];
