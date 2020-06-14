import { Component, ChangeDetectionStrategy } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";

import { SmartTableData } from "../../@core/data/smart-table";
import { InstituicaoService } from "../instituicao.service";
import { finalize } from "rxjs/operators";

@Component({
  selector: 'ngx-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.scss'],
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
        title: "Nome",
        type: "string",
        editable: false,
      },
      /*coordenador: {
        title: "Coordenador",
        type: "string",
        editable: false,
      },*/
      coordenador: {
        title: 'Coordenador',
        type: "string",
        valuePrepareFunction: (coordenador) => {
          return coordenador.nome;
        }
      },

    },
  };
  lists = [];
  turmas = [];


  constructor(
    private service: SmartTableData,
    private InstituicaoService: InstituicaoService
  ) {

  }

  ngOnInit() {
    this.getTurmas();
  }

  getTurmas() {
    this.InstituicaoService
      .getTurmas()
      .subscribe((response) => {
        this.lists = response;
        this.lists.forEach(element => {
          element.series.forEach(element2 => {
            this.turmas.push(element2.turmas);
            console.log(this.turmas);
            
          });


        });
      })
  }

  /* onSearch(query: string = "") {
     if (query != "") {
       this.source.setFilter(
         [
           // fields we want to include in the search
           {
             field: "id",
             search: query,
           },
           {
             field: "grupo",
             search: query,
           },
           {
             field: "serie",
             search: query,
           },
           {
             field: "nome",
             search: query,
           },
           {
             field: "coordenador",
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
   }*/

  onDeleteConfirm(event): void {
    console.log(event);
    if (
      window.confirm(
        "Tem certeza que deseja exclulir esta turma?"
      )
    ) {
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    console.log(event);


  }
}

