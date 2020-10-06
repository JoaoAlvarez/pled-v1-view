import { Component } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SmartTableData } from "../../../@core/data/smart-table";
import { instituicoesService } from "../instituicoes.service";
import { finalize } from "rxjs/operators";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { BadgeComponent } from "../../../@theme/components/badge/badge.component";
import { instituicoesAnexosComponent } from "../components/anexos.component";

@Component({
  selector: "instituicoes-listar",
  templateUrl: "./instituicoes.listar.component.html",
  styleUrls: ["./instituicoes.listar.component.scss"],
})
export class instituicoesListarComponent {
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
        { name: 'status', title: '<i class="nb-trash"></i>' }
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
      cnpj: {
        title: "CNPJ",
        type: "string",
        editable: false,
      },
      responsavel: {
        title: "Responsável",
        type: "string",
        valuePrepareFunction: (responsavel) => {
          return responsavel.nome;
        }
      },
      ativa: {
        title: "Status",
        type: "string",
        valuePrepareFunction: (status) => {
          return (status) ? 'Ativo' : 'Inativo';
        }
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  newStatus: FormGroup;
  //source;

  constructor(
    private formBuilder: FormBuilder,
    private service: SmartTableData,
    private instituicoesService: instituicoesService,
    private router: Router,
  ) {
    const data = this.service.getData();
    //this.source.load(data);
    this.getInstituicoes();
  }

  getInstituicoes() {
    this.instituicoesService
      .getInstituicoes()
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        this.source.load(response);
        this.source.setSort(
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
            field: "responsavel",
            search: query,
          },

        ],
        false
      );
    } else {
      this.source.reset();
    }
  }

  onCustomAction(event): void {
    console.log(event);
    switch (event.action) {
      case 'edit':
        this.router.navigateByUrl("/admin/instituicoes/editar/" + event.data.id);
        break;

      case 'status': {

        this.newStatus = this.formBuilder.group({
          instituicao: event.data.id,
          status: false
        });
        const result: status = Object.assign({}, this.newStatus.value);
        this.instituicoesService
          .mudarStatus(result)
          .pipe(finalize(() => { }))
          .subscribe((response) => {
            if (response) {
              Swal.fire('Ok', 'Insituição removida com sucesso', 'success');
              this.router.navigateByUrl("/admin/instituicoes/listar");
            }
          });
      }
    }

  }
}
export class status {
  instituicao: string = ''
  status: boolean
}
