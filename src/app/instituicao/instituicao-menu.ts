import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [

    {
        title: "Usuários",
        icon: "people-outline",
        children: [
            {
                title: "Adicionar Alunos",
                link: "/instituicao/usuarios/adicionaraluno",
            },
            {
                title: "Adicionar Professores",
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
    {
        title: "Turmas",
        icon: "people-outline",
        children: [
            {
                title: "Cadastrar Turma",
                link: "/instituicao/turmas/cadastrar",
            },
            {
                title: "Listar Turmas",
                link: "/instituicao/turmas",
            },

        ],
        
    },

    {
        title: "Disciplinas",
        icon: "people-outline",
        children: [
            {
                title: "Adicionar Disciplinas",
                link: "/instituicao/disciplinas/cadastrar",
            },
            {
                title: "Listar Disciplinas",
                link: "/instituicao/disciplinas",
            },


        ],
        
    },
];
