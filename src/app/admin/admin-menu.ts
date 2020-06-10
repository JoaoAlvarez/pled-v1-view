import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: "Instituições",
    icon: "people-outline",
    children: [
      {
        title: "Listar instituições",
        link: "/pages/instituicoes/listar",
      },
      {
        title: "Adicionar instituição",
        link: "/pages/instituicoes/adicionar",
      },
    ],
  },
];