import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [

    {
        title: "Usuários",
        icon: "people-outline",
        children: [
            {
                title: "Adicionar Usuário",
                link: "/instituicao/usuarios/adicionar",
            },
            {
                title: "Alunos",
                link: "/instituicao/usuarios/alunos",
            },
            {
                title: "Professores e Coordenadores",
                link: "/instituicao/usuarios/professores",
            }

        ],
    },
];
