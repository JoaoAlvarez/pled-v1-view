import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [

    {
        title: "Simulados",
        icon: "people-outline",
        children: [
            {
                title: "Criar",
                link: "/professor/simulados/criar",
            },
            {
                title: "Listar",
                link: "/professor/simulados",
            },

        ],

    },

    {
        title: "Turmas",
        icon: "people-outline",
        children: [
            {
                title: "Listar",
                link: "/professor/turmas",
            },

        ],

    },
    {
        title: "Materiais",
        icon: "people-outline",
        children: [
            {
                title: "Criar",
                link: "/professor/materiais/cadastrar",
            },
            {
                title: "Listar",
                link: "/professor/materiais/listar",
            },

        ],

    },
    {
        title: "Planejamento de Aulas",
        icon: "people-outline",
        children: [
            {
                title: "Criar",
                link: "/professor/planejamento/criar",
            },
            {
                title: "Listar",
                link: "/professor/planejamento/listar",
            },

        ],

    },

];
