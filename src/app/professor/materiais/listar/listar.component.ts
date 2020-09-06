import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { SmartTableData } from "../../../@core/data/smart-table";
import { ProfessorService } from "../../professor.service";
import { finalize } from "rxjs/operators";
import { Router } from '@angular/router';

@Component({
  selector: 'materiais-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class MateriaisListarComponent implements OnInit {

  isLoading: Boolean = true;
  turmas = [];
  turmasFiltered = [];
  disciplinas = [];
  selectedTurma;
  selectedDisciplina;

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

      nome: {
        title: "Nome",
        type: "string",
        editable: false,
      },
      descricao: {
        title: "Descrição",
        type: "string",
        editable: false,
      },
      url: {
        title: "Link",
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
  ) { }

  ngOnInit() {
    this.getDisciplinas();
    this.getTurmasProfessor();
  }

  getTurmasProfessor() {
    this.ProfessorService
      .getTurmas()
      .subscribe((response) => {
        this.isLoading = false;
        this.turmas = response;
      });
  }

  getDisciplinas() {
    this.disciplinas = this.ProfessorService.professorDetalhe.disciplinas;
  }

  filtrarTurma(disciplinaId) {
    this.turmasFiltered = this.turmas.filter(
      turma => turma.disciplinas.some(disciplina => disciplina.idProfessorDisciplina == disciplinaId
      ));
  }

  getMateriais(disciplinaId, turmaId) {
    this.ProfessorService
      .getMateriais(disciplinaId, turmaId)
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
  fromObject: {
    turma: '',
    disciplina: '',
  }

}
