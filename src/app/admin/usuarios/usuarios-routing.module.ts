import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UsuariosComponent } from './usuarios.component';
import { UsuariosListarComponent } from './listar/usuarios.component';
const routes: Routes = [
    {
        path: "",
        component: UsuariosComponent,
        children: [
            {
                path: "", redirectTo: "listar", pathMatch: "full"
            },
            {
                path: "listar",
                component: UsuariosListarComponent,
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
    UsuariosComponent,
    UsuariosListarComponent
];
