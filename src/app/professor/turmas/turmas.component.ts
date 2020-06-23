import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { DatePipe } from '@angular/common';

import { SmartTableData } from "../../@core/data/smart-table";
import { ProfessorService } from "../professor.service";
import { finalize } from "rxjs/operators";

@Component({
  selector: 'ngx-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.scss']
})
export class TurmasComponent {

  settings = {
    hideSubHeader: true,
    actions: {
      add: false,
      position: "right",
      columnTitle: "Ações",
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
        title: "Nome da Turma",
        type: "string",
        editable: false,
      },
      meet: {
        title: "Link do Meet",
        type: "string",
        valuePrepareFunction: (meet) => {
          return meet.link
        }
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: SmartTableData,
    private ProfessorService: ProfessorService
  ) {
    const data = this.service.getData();

    //this.source.load(data);
    this.getSimulados();

  }

  getSimulados() {
    this.ProfessorService
      .getTurmas()
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        console.log(response);
        this.source.load(response);
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
            field: "titulo",
            search: query,
          },
          {
            field: "descricao",
            search: query,
          },
          {
            field: "tipo",
            search: query,
          },
          {
            field: "prazoInicial",
            search: query,
          },
          {
            field: "prazoFinal",
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
        "Tem certeza que deseja rejeitar a aprovação deste usuário?"
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

  onEditConfirm(event): void {
    console.log(event);


  }
  onUserRowSelect(event, modal) {
    event => this.source = event;
    console.log(event.settings);
  }

}
