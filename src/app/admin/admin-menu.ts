import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: "Instituições",
    icon: "people-outline",
    children: [
      {
        title: "Listar instituições",
        link: "/admin/instituicoes/listar",
      },
      {
        title: "Adicionar instituição",
        link: "/admin/instituicoes/adicionar",
      },
    ],
  },
  {
    title: "Usuários",
    icon: "people-outline",
    children: [
        {
            title: "Listar",
            link: "/admin/usuarios/listar",
        },

    ],

},
];