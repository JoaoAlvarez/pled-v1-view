import { Component } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";

import { SmartTableData } from "../../../../@core/data/smart-table";
import { InstituicaoService } from "../../../instituicao.service";
import { finalize } from "rxjs/operators";

import { BadgeComponent } from "../../../../@theme/components/badge/badge.component";
//import { instituicoesAnexosComponent } from "../components/anexos.component";


@Component({
  selector: 'professores-listar',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.scss']
})
export class ProfessoresListarComponent {

  settings = {
    hideSubHeader: true,
    actions: {
      add: false,
      position: "right",
      columnTitle: "Ações",
      edit: false,
      delete: false,

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
      perfil: {
        title: "Perfil",
        type: "string",
        editable: false,
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

    },
  };

  source: LocalDataSource = new LocalDataSource();
  //source;

  constructor(
    private service: SmartTableData,
    private InstituicaoService: InstituicaoService
  ) {
    const data = this.service.getData();
    //this.source.load(data);
    this.getProfessores();
  }

  getProfessores() {
    this.InstituicaoService
      .getProfessores()
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        console.log(response);
        this.source.load(response);
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
            field: "perfil",
            search: query,
          },
          {
            field: "cpf",
            search: query,
          }
        ],
        false
      );
    } else {
      this.source.reset();
    }
  }


}
