import { Component } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";

import { SmartTableData } from "../../../@core/data/smart-table";
import { ProfessorService } from "../../professor.service";
import { finalize } from "rxjs/operators";

import { BadgeComponent } from "../../../@theme/components/badge/badge.component";
//import { instituicoesAnexosComponent } from "../components/anexos.component";
import { Router } from '@angular/router';

@Component({
  selector: 'materiais-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class MateriaisListarComponent {

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
        { name: 'delete', title: '<i class="nb-trash"></i>' }
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

      turma: {
        title: "Nome",
        type: "string",
        editable: false,
      },
      disciplina: {
        title: "Descrição",
        type: "string",
        editable: false,
      },

    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: SmartTableData,
    private ProfessorService: ProfessorService,
    private router: Router,
  ) {
    const data = this.service.getData();

    //this.source.load(data);
    this.getMateriais();

  }

  getMateriais() {
    var turma="5f021596c15ffea8d9fa4aba";
    var disciplina="5f021b3c211e99ae5eb85d01";
    var materialTurma = {turma,disciplina};
    const result: turma = Object.assign({}, materialTurma);
    this.ProfessorService
      .getMateriais(result)
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
export class turma {
  turma: string = '';
  disciplina: string = '';

}
