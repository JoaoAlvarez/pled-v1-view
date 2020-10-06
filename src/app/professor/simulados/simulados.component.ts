import { Component } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { DatePipe } from '@angular/common';

import { SmartTableData } from "../../@core/data/smart-table";
import { ProfessorService } from "../professor.service";
import { finalize } from "rxjs/operators";

import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'ngx-simulados',
  templateUrl: './simulados.component.html',
  styleUrls: ['./simulados.component.scss']
})
export class SimuladosComponent {

  settings = {
    hideSubHeader: true,
    actions: {
      add: false,
      position: "right",
      columnTitle: "Ações",
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
      titulo: {
        title: "Título",
        type: "html",
        editable: false,
        valuePrepareFunction: (titulo, row) => {
          return '<a href="#/professor/atividade/' + row.id + '" >' + titulo + '</a>'
        }
      },
      descricao: {
        title: "Descrição",
        type: "string",
        editable: false,
      },
      tipo: {
        title: "Tipo",
        type: "string",
        editable: false,
      },

      prazoInicial: {
        title: "Prazo Inicial",
        type: "string",
        valuePrepareFunction: (prazoInicial) => {
          return new DatePipe('en-US').transform(prazoInicial, 'dd/MM/yyyy');
        }
      },
      prazoFinal: {
        title: "Prazo Final",
        type: "string",
        valuePrepareFunction: (prazoFinal) => {
          return new DatePipe('en-US').transform(prazoFinal, 'dd/MM/yyyy');
        }
      },


    },
  };

  source: LocalDataSource = new LocalDataSource();

  isLoading: Boolean = true;
  simulados;
  simuladosFiltered;
  turmas = [];
  turmasFiltered = [];
  disciplinas = [];
  selectedTurma;
  selectedDisciplina;



  constructor(
    private service: SmartTableData,
    private ProfessorService: ProfessorService,
    private sidebarService: NbSidebarService
  ) {
    const data = this.service.getData();

    //this.source.load(data);
    this.getSimulados();
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
    delete this.turmasFiltered;
    delete this.selectedTurma;
    this.turmasFiltered = this.turmas.filter(
      turma => turma.disciplinas.some(disciplina => disciplina.idProfessorDisciplina == disciplinaId.idProfessorDisciplina
      ));
  }

  getSimulados() {
    this.ProfessorService
      .getSimulados()
      .pipe(finalize(() => { }))
      .subscribe((response) => {

        this.simulados = response.sort((a, b) => { return <any>new Date(b.prazoFinal) - <any>new Date(a.prazoFinal) })

        //this.simulados = response;


        this.source.load(this.simulados);
        this.source.refresh();
      });
  }

  filterSimulados(disciplina, turmaId) {
    console.log('oi');
    this.simuladosFiltered = this.simulados.filter(simulado => (simulado.contidoEm.some(el => el.idTurma == turmaId) && (simulado.contidoEm.some(el => el.disciplina.nome == disciplina.nome))));

    this.source.load(this.simuladosFiltered);
    this.source.refresh();

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
            field: "titulo",
            search: query,
          },
          {
            field: "descricao",
            search: query,
          },
          {
            field: "tipo",
            search: query,
          },
          {
            field: "prazoInicial",
            search: query,
          },
          {
            field: "prazoFinal",
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
  onUserRowSelect(event, modal) {
    event => this.source = event;
    console.log(event.settings);
  }
}
