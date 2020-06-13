import { Component } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";

import { SmartTableData } from "../../../@core/data/smart-table";
import { InstituicaoService } from "../../instituicao.service";
import { finalize } from "rxjs/operators";

import { BadgeComponent } from "../../../@theme/components/badge/badge.component";
//import { instituicoesAnexosComponent } from "../components/anexos.component";


@Component({
  selector: 'ngx-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss']
})
export class AlunosComponent {

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
    this.getAlunos();
  }

  getAlunos() {
    this.InstituicaoService
      .getAlunos()
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        console.log(response);
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

  onEditConfirm(event): void {
    console.log(event);


  }
}
