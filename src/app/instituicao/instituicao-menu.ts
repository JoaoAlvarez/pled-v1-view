import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [

    {
        title: "Usuários",
        icon: "people-outline",
        children: [
            {
                title: "Alunos",
                link: "/instituicao/usuarios/alunos/listar",
            },
            {
                title: "Adicionar Alunos",
                link: "/instituicao/usuarios/alunos/adicionar",
            },
            {
                title: "Professores e Coordenadores",
                link: "/instituicao/usuarios/professores/listar",
            },
            {
                title: "Adicionar Professores",
                link: "/instituicao/usuarios/professores/adicionar",
            }

        ],

    },
    {
        title: "Turmas",
        icon: "home-outline",
        children: [
            {
                title: "Cadastrar Turma",
                link: "/instituicao/turmas/cadastrar",
            },
            {
                title: "Listar Turmas",
                link: "/instituicao/turmas/listar",
            },

        ],

    },

    {
        title: "Disciplinas",
        icon: "book-open-outline",
        children: [
            {
                title: "Adicionar Disciplinas",
                link: "/instituicao/disciplinas/cadastrar",
            },
            {
                title: "Listar Disciplinas",
                link: "/instituicao/disciplinas/listar",
            },


        ],

    },
    {
        title: "Grupos",
        icon: "layers-outline",
        children: [
            {
                title: "Cadastrar Grupo",
                link: "/instituicao/grupos/cadastrar",
            },
            {
                title: "Listar Grupo",
                link: "/instituicao/grupos/listar",
            },

        ],

    },
];
