import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [

    {
        title: "Home",
        icon: "home-outline",
        link: "/professor/home"

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
        title: "Atividades",
        icon: "edit-2-outline",
        children: [
            {
                title: "Criar",
                link: "/professor/atividades/criar",
            },
            {
                title: "Listar",
                link: "/professor/atividades",
            },

        ],

    },


    {
        title: "Materiais",
        icon: "book-open-outline",
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
        icon: "calendar-outline",
        children: [
            {
                title: "Planos de aula",
                link: "/professor/planejamento/criar",
            },
            // {
            //     title: "Listar",
            //     link: "/professor/planejamento/listar",
            // },

        ],

    },

];
