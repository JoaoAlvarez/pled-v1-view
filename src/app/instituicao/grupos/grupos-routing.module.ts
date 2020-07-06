import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { GruposComponent } from './grupos.component';
import { GruposListarComponent } from './listar/listar.component';
import { GruposCadastrarComponent } from './cadastrar/cadastrar.component';
const routes: Routes = [
    {
        path: "",
        component: GruposComponent,
        children: [
            { path: "", redirectTo: "listar", pathMatch: "full" },
            {
                path: "listar",
                component: GruposListarComponent
            },
            {
                path: "cadastrar",
                component: GruposCadastrarComponent
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
    GruposComponent,
    GruposListarComponent,
    GruposCadastrarComponent

];
