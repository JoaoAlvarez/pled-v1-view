import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AlunosComponent } from './alunos.component';
import { AlunosListarComponent } from './listar/alunos.component';
import { AlunosAdicionarComponent } from './adicionar/adicionar.component';
import { AlunosEditarComponent } from './editar/editar.component';
const routes: Routes = [
    {
        path: "",
        component: AlunosComponent,
        children: [
            { path: "", redirectTo: "listar", pathMatch: "full" },
            {
                path: "listar",
                component: AlunosListarComponent,
            },
            {
                path: "adicionar",
                component: AlunosAdicionarComponent,
            },
            {
                path: "editar/:id",
                component: AlunosEditarComponent,
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
    AlunosComponent,
    AlunosListarComponent,
    AlunosAdicionarComponent,
    AlunosEditarComponent
];
