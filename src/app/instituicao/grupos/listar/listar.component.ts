import { Component } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SmartTableData } from "../../../@core/data/smart-table";
import { InstituicaoService } from "../../instituicao.service";
import { finalize } from "rxjs/operators";

import { BadgeComponent } from "../../../@theme/components/badge/badge.component";
//import { instituicoesAnexosComponent } from "../components/anexos.component";
import { Router } from '@angular/router';
import { NbResetPasswordComponent } from '@nebular/auth';

import Swal from 'sweetalert2';

@Component({
  selector: 'grupos-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class GruposListarComponent {
  form!: FormGroup;
  isLoading: Boolean = false;

  settings = {
    hideSubHeader: true,
    actions: {
      position: "right",
      columnTitle: "Ações",
      add: false,
      edit: true,
      delete: false,
      /*custom: [
        { name: 'edit', title: '<i class="nb-edit"></i>' },
        { name: 'delete', title: '<i class="nb-trash"></i>' }
      ],*/
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
        valuePrepareFunction: (value, row, cell) => {
          return this.list[cell.row.index];
        }
      },

    },
  };

  list = [];

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: SmartTableData,
    private InstituicaoService: InstituicaoService,
    private router: Router,
  ) {
    this.getGrupos();
  }

  getGrupos() {
    this.InstituicaoService
      .getGrupos()
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        response.forEach(element => {
          this.list.push(element);

        });
        /*this.list.push(response);
        this.index++;
        console.log(this.index);*/
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
            field: "nome",
            search: query,
          },
          {
            field: "descricao",
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
  onCustomAction(event): void {
    console.log(event);
    // alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
    this.router.navigateByUrl("/instituicao/disciplinas/editar/" + event.data._id);
  }
  onDeleteConfirm(event): void {
    console.log(event);
    if (
      window.confirm(
        "Tem certeza que deseja deletar este grupo"
      )
    ) {

      let data = {
        'nome': event.data
      }

      this.InstituicaoService
        .deleteGrupo(data)
        .pipe(finalize(() => { }))
        .subscribe((response) => {
          event.confirm.resolve();
          this.getGrupos();
        });
    } else {
      event.confirm.reject();
    }
  }
  onEdit(event): void {
    //console.log(event);
  }
  onEditConfirm(event): void {

    console.log(event);

    let data = {
      'nome': event.data,
      'novoNome': event.newData.nome
    }

    this.isLoading = true;
    this.InstituicaoService
      .editarGrupo(data)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response) => {

        this.isLoading = false;

        if (response) {

          Swal.fire('Ok', 'Grupo atualizado com sucesso', 'success');
          this.getGrupos();
        }
      });

  }
}

export class grupo {
  nome: string = '';
  novoNome: string = '';
}
