import { Component } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";

import { SmartTableData } from "../../../../@core/data/smart-table";
import { InstituicaoService } from "../../../instituicao.service";
import { finalize } from "rxjs/operators";

import { UsuariosService } from '../../../../admin/usuarios/usuarios.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'professores-listar',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.scss']
})
export class ProfessoresListarComponent {

  settingsDefault = {
    hideSubHeader: true,
    noDataMessage: 'Não há nenhum dado para exibir',
    actions: {
      add: false,
      position: "right",
      columnTitle: "Ações",
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
        title: "E-mail",
        type: "string",
        editable: false,
      },

    },
  };

  settings1 = {
    ...this.settingsDefault,
    actions: {
      ...this.settingsDefault.actions,
      custom: [
        ...this.settingsDefault.actions.custom,
        { name: 'status', title: '<i class="nb-trash" title="Desativar usuário"></i>' }
      ]
    }
  };

  settings2 = {
    ...this.settingsDefault,
    actions: {
      ...this.settingsDefault.actions,
      custom: [
        ...this.settingsDefault.actions.custom,
        { name: 'status', title: '<i class="nb-loop" title="Ativar usuário"></i>' }
      ]
    }
  };

  source: LocalDataSource = new LocalDataSource();
  source2: LocalDataSource = new LocalDataSource();

  constructor(
    private InstituicaoService: InstituicaoService,
    private UsuarioService: UsuariosService,
    private router: Router,


  ) {
    this.getProfessores();
  }

  getProfessores() {
    this.InstituicaoService
      .getProfessores()
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        const ativos = response.filter((usuario) => usuario.isAtivo);
        const inativos = response.filter((usuario) => !usuario.isAtivo);

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
        'id': event.data.id,
        'status': !event.data.isAtivo
      }

      this.UsuarioService
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

          this.getProfessores();
        });
    }
  }

  onCustomAction(event, source): void {
    if (event.action == 'status') {
      this.onDeleteConfirm(event, source);
    } else if (event.action == 'edit') {
      this.router.navigateByUrl("/instituicao/usuarios/professores/adicionar/" + event.data.id);
    }
  }


}
