import { Component, Input, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { DatePipe } from '@angular/common';

import { SmartTableData } from "../../../@core/data/smart-table";
import { UsuariosService } from "../usuarios.service";
import { finalize } from "rxjs/operators";
import { ViewCell } from 'ng2-smart-table';


import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ValidatedComponent } from '../../../miscellaneous/validated/validated.component';


@Component({
  selector: 'usuarios-listar',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']

})
export class UsuariosListarComponent {

  settingsDefault = {

    hideSubHeader: true,
    noDataMessage: 'Não há nenhum dado para exibir',

    actions: {
      position: "right",
      columnTitle: "Ações",
      add: false,
      edit: false,
      delete: false
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
      perfil: {
        title: "Perfil",
        type: "string",
      },
      validated: {
        title: "Validado",
        type: "custom",
        renderComponent: ValidatedComponent
      },
      isAtivo: {
        title: "Status",
        type: "string",
        valuePrepareFunction: (isAtivo) => {
          if (isAtivo) {
            return 'Ativo'
          } else {

            return 'Inativo'
          }
        }
      },

    },
  };

  settings1 = {
    ...this.settingsDefault,
    actions: {
      ...this.settingsDefault.actions,
      custom: [
        { name: 'status', title: '<i class="nb-trash" title="Desativar usuário"></i>' }
      ]
    }
  };

  settings2 = {
    ...this.settingsDefault,
    actions: {
      ...this.settingsDefault.actions,
      custom: [
        { name: 'status', title: '<i class="nb-loop" title="Ativar usuário"></i>' }
      ]
    }
  };

  source: LocalDataSource = new LocalDataSource();
  source2: LocalDataSource = new LocalDataSource();

  constructor(
    private UsuariosService: UsuariosService,
    private router: Router,
  ) {
    this.getUsuarios();
  }

  getUsuarios() {
    this.UsuariosService
      .getUsuarios()
      .pipe(finalize(() => { }))
      .subscribe((response) => {

        const ativos = response.filter((usuario) => usuario.isAtivo);
        const inativos = response.filter((usuario) => !usuario.isAtivo);

        this.source.load(ativos);
        this.source2.load(inativos);
        this.source.refresh();
        this.source2.refresh();
        // this.source.addFilter( // Filtrar pendentes
        //   {
        //     field: "onboardStatus",
        //     search: "Pendente",
        //   },

        //   false
        // );
        // this.source.setSort(
        //   // Filtrar pendentes
        //   [
        //     {
        //       field: "onboardStatus",
        //       direction: "desc",
        //     },
        //   ],

        //   false
        // );
      });
  }

  onSearch(query: string = "") {
    if (query != "") {
      this.source.setFilter(
        [
          // fields we want to include in the search
          {
            field: "nome",
            search: query,
          },
          {
            field: "cpf",
            search: query,
          },
          {
            field: "email",
            search: query,
          },
          {
            field: "perfil",
            search: query,
          },
          {
            field: "validated",
            search: query,
          },
          {
            field: "isAtivo",
            search: query,
          },
        ],
        false
      );
    } else {
      this.source.reset();
    }
  }

  onDeleteConfirm(event, source): void {
    if (
      window.confirm(
        "Tem certeza que deseja " + (event.data.isAtivo ? 'desativar' : 'ativar') + " este usuário?"
      )
    ) {

      let txtStatus = '';

      if (source == 'source1') {
        txtStatus = 'desativado';
      } else if (source == 'source2') {
        txtStatus = 'ativado';
      }

      let dados = {
        'id': event.data._id,
        'status': !event.data.isAtivo
      }

      this.UsuariosService
        .deleteUser(dados)
        .pipe(finalize(() => { }))
        .subscribe((response) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          })
          Toast.fire({
            icon: 'success',
            title: 'O usuário ' + event.data.nome + ' ' + txtStatus + ' com sucesso'
          })
          //Swal.fire('Ok', 'O usuário '+event.data.nome+' foi destivado com sucesso', 'success');

          this.getUsuarios();
        });
    }
  }

  onCustomAction(event, source): void {
    if (event.action == 'status') {
      this.onDeleteConfirm(event, source);
    }
  }
}