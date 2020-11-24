import { Component } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SmartTableData } from "../../../@core/data/smart-table";
import { instituicoesService } from "../instituicoes.service";
import { finalize } from "rxjs/operators";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: "instituicoes-listar",
  templateUrl: "./instituicoes.listar.component.html",
  styleUrls: ["./instituicoes.listar.component.scss"],
})
export class instituicoesListarComponent {
  settingsDefault = {
    hideSubHeader: true,
    noDataMessage: 'Não há nenhum dado para exibir',
    actions: {
      position: "right",
      columnTitle: "Ações",
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'edit', title: '<i class="nb-edit"></i>' },
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

  settings1 = {
    ...this.settingsDefault,
    actions: {
      ...this.settingsDefault.actions,
      custom: [
        ...this.settingsDefault.actions.custom,
        { name: 'status', title: '<i class="nb-trash" title="Desativar instituição"></i>' }
      ]
    }
  };

  settings2 = {
    ...this.settingsDefault,
    actions: {
      ...this.settingsDefault.actions,
      custom: [
        ...this.settingsDefault.actions.custom,
        { name: 'status', title: '<i class="nb-loop" title="Ativar instituição"></i>' }
      ]
    }
  };

  source: LocalDataSource = new LocalDataSource();
  source2: LocalDataSource = new LocalDataSource();
  newStatus: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: SmartTableData,
    private instituicoesService: instituicoesService,
    private router: Router,
  ) {
    this.getInstituicoes();
  }

  getInstituicoes() {
    this.instituicoesService
      .getInstituicoes()
      .pipe(finalize(() => { }))
      .subscribe((response) => {

        const ativos = response.filter((instituicao) => instituicao.ativa);
        const inativos = response.filter((instituicao) => !instituicao.ativa);

        this.source.load(ativos);
        this.source2.load(inativos);
        this.source.refresh();
        this.source2.refresh();
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

  onCustomAction(event, source): void {
    switch (event.action) {
      case 'edit':
        this.router.navigateByUrl("/admin/instituicoes/editar/" + event.data.id);
        break;

      case 'status': {

        let txtStatus = '';

        if (source == 'source1') {
          txtStatus = 'desativada';
        } else if (source == 'source2') {
          txtStatus = 'ativada';
        }

        this.newStatus = this.formBuilder.group({
          instituicao: event.data.id,
          status: !event.data.ativa
        });
        const result: status = Object.assign({}, this.newStatus.value);
        this.instituicoesService
          .mudarStatus(result)
          .pipe(finalize(() => { }))
          .subscribe((response) => {
            if (response) {
              Swal.fire('Ok', 'Insituição <b>' + event.data.nome + '</b> ' + txtStatus + ' com sucesso', 'success');
              this.getInstituicoes();
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
