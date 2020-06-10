import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [

    {
        title: "Usuários",
        icon: "people-outline",
        children: [
            {
                title: "Professores",
                link: "/instituicao/usuarios/professores",
            },
            {
                title: "Alunos",
                link: "/instituicao/usuarios/alunos",
            },
        ],
    },
];
