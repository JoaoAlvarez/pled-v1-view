import { Component, Input, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { DatePipe } from '@angular/common';

import { SmartTableData } from "../../../@core/data/smart-table";
import { UsuariosService } from "../usuarios.service";
import { finalize } from "rxjs/operators";
import { ViewCell } from 'ng2-smart-table';


import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'usuarios-listar',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']

})
export class UsuariosListarComponent {

  settingsDefault = {

    hideSubHeader: true,

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
        renderComponent: UsuariosValidatedComponent
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
  //source;

  constructor(
    private service: SmartTableData,
    private UsuariosService: UsuariosService,
    private router: Router,
  ) {
    const data = this.service.getData();
    //this.source.load(data);
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

@Component({
  templateUrl: './usuarios.validated.html',

})
export class UsuariosValidatedComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: any;
  @Input() rowData: any;

  constructor(
    private service: SmartTableData,
    private UsuariosService: UsuariosService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.renderValue = this.value;
  }

  resendValidation() {
    console.log('rowData', this.rowData);
    this.UsuariosService
      .resendValidation(this.rowData._id)
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        //Swal.fire('Ok', 'E-mail de validação reenviado', 'success');
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
        Toast.fire({
          icon: 'success',
          title: 'E-mail de validação reenviado com sucesso'
        })

      });
    return false;
  }
}
