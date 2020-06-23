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

];
