import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [

    {
        title: "Voltar",
        icon: "arrow-back-outline",
        link: "/",


    },
    {
        title: "Meus dados",
        icon: "people-outline",
        children: [
            {
                title: "Alterar senha",
                link: "/perfil/senha",
            },

        ],

    },
];