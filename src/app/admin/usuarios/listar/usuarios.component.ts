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

  settings = {

    hideSubHeader: true,

    actions: {
      position: "right",
      columnTitle: "Ações",
      add: false,
      edit: false,
      delete: false,
      custom: [
        // { name: 'edit', title: '<i class="nb-edit"></i>' },
        { name: 'delete', title: '<i class="nb-trash" ></i>' }
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

  source: LocalDataSource = new LocalDataSource();
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

  reenviarValidacao() {
    alert("oi");
  }

  getUsuarios() {
    this.UsuariosService
      .getUsuarios()
      .pipe(finalize(() => { }))
      .subscribe((response) => {
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
    console.log(event.data);
    if (
      window.confirm(
        "Tem certeza que deseja " + event.data.isAtivo + " este usuário?"
      )
    ) {
      this.UsuariosService
        .deleteUser(event.data)
        .pipe(finalize(() => { }))
        .subscribe((response) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          })
          //Swal.fire('Ok', 'O usuário '+event.data.nome+' foi destivado com sucesso', 'success');
          Toast.fire({
            icon: 'success',
            title: 'O usuário ' + event.data.nome + ' foi destivado com sucesso'
          })

          this.getUsuarios();
        });
    }
  }

  onCustomAction(event): void {
    console.log(event.action);
    if (event.action == 'delete') {
      console.log(event);
      this.onDeleteConfirm(event);
    }
  }

  /*onEditConfirm(event): void {
    console.log(event);
    if (
      window.confirm(
        "Tem certeza que deseja editar este usuário?"
      )
    ) {
      this.UsuariosService
        .inserirUsuarios(event.data.id)
        .pipe(finalize(() => { }))
        .subscribe((response) => {
          event.confirm.resolve();
          this.getUsuarios();
        });
    } else {
      event.confirm.reject();
    }

  }*/
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
        Swal.fire('Ok', 'E-mail de validação reenviado', 'success');

      });
    return false;
  }
}
