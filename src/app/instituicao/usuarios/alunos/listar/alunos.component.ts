import { Component } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { DatePipe } from '@angular/common';

import { SmartTableData } from "../../../../@core/data/smart-table";
import { InstituicaoService } from "../../../instituicao.service";
import { finalize } from "rxjs/operators";

import { Router } from '@angular/router';


@Component({
  selector: 'alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss']

})
export class AlunosListarComponent {

  settings = {

    hideSubHeader: true,

    actions: {
      position: "right",
      columnTitle: "Ações",
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'edit', title: '<i class="nb-edit"></i>' },
        { name: 'delete', title: '<i class="nb-trash"></i>' }
      ],

    },

    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent:
        '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      nome: {
        title: "Nome",
        type: "string",
        editable: true,
      },
      cpf: {
        title: "CPF",
        type: "string",
        editable: false,
      },
      email: {
        title: "E-Mail",
        type: "string",
        editable: false,
      },
      turma: {
        title: "Turma",
        type: "string",
        valuePrepareFunction: (turma) => {
          return turma.nome;
        }
      }

    },
  };

  source: LocalDataSource = new LocalDataSource();
  //source;

  constructor(
    private service: SmartTableData,
    private InstituicaoService: InstituicaoService,
    private router: Router,
  ) {
    const data = this.service.getData();
    //this.source.load(data);
    this.getAlunos();
  }

  getAlunos() {
    this.InstituicaoService
      .getAlunos()
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        console.log(response.phones);
        this.source.load(response);
        // this.source.addFilter( // Filtrar pendentes
        //   {
        //     field: "onboardStatus",
        //     search: "Pendente",
        //   },

        //   false
        // );
        this.source.setSort(
          // Filtrar pendentes
          [
            {
              field: "onboardStatus",
              direction: "desc",
            },
          ],

          false
        );
        this.source.refresh();
      });
  }

  onSearch(query: string = "") {
    if (query != "") {
      this.source.setFilter(
        [
          // fields we want to include in the search
          {
            field: "id",
            search: query,
          },
          {
            field: "name",
            search: query,
          },
          {
            field: "cpf",
            search: query,
          },
          {
            field: "turma",
            search: query,
          },
          {
            field: "onboardStatus",
            search: query,
          },
        ],
        false
      );
    } else {
      this.source.reset();
    }
  }

  onDeleteConfirm(event): void {
    console.log(event);
    if (
      window.confirm(
        "Tem certeza que deseja excluir este usuário?"
      )
    ) {
      // this.instituicoesService
      //   .reprovarUsuario(event.data.id)
      //   .pipe(finalize(() => { }))
      //   .subscribe((response) => {
      //     event.confirm.resolve();
      //     this.getInstituicoes();
      //   });
    } else {
      event.confirm.reject();
    }
  }

  onCustomAction(event): void {
    console.log(event);
    // alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
    this.router.navigateByUrl("/instituicao/usuarios/alunos/editar/" + event.data.id);
  }

  onEditConfirm(event): void {
    console.log(event);
    if (
      window.confirm(
        "Tem certeza que deseja editar este usuário?"
      )
    ) {
      this.InstituicaoService
        .inserirAluno(event.data.id)
        .pipe(finalize(() => { }))
        .subscribe((response) => {
          event.confirm.resolve();
          this.getAlunos();
        });
    } else {
      event.confirm.reject();
    }

  }
}
