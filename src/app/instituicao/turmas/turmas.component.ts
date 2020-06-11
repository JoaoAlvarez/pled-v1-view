import { Component } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";

import { SmartTableData } from "../../@core/data/smart-table";
import { InstituicaoService } from "../instituicao.service";
import { finalize } from "rxjs/operators";

import { BadgeComponent } from "../../@theme/components/badge/badge.component";
//import { instituicoesAnexosComponent } from "../components/anexos.component";


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
      grupo: {
        title: "Grupo",
        type: "string",
        editable: true,
      },
      serie: {
        title: "Serie",
        type: "string",
        editable: false,
      },
      nome: {
        title: "Nome",
        type: "string",
        editable: false,
      },
      coordenador: {
        title: "Coordenador",
        type: "string",
        editable: false,
      },

    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: SmartTableData,
    private InstituicaoService: InstituicaoService
  ) {
    const data = this.service.getData();

    //this.source.load(data);
    this.getTurmas();

  }

  getTurmas() {
    this.InstituicaoService
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
}
