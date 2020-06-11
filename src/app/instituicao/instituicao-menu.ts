import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [

    {
        title: "Usuários",
        icon: "people-outline",
        children: [
            {
                title: "Coordenadores",
                link: "/instituicao/usuarios/coordenadores",
            },
            {
                title: "Professores",
                link: "/instituicao/usuarios/professores",
            },
            {
                title: "Alunos",
                link: "/instituicao/usuarios/alunos",
            },
            {
                title: "Adicionar",
                link: "/instituicao/usuarios/adicionar",
            },
        ],
    },
];
