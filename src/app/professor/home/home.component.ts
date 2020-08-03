import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../professor.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  disciplinas: any = [];
  simulados: any = [];
  turmas: any = [];
  turmasLoading: boolean = true;
  timelineLoading: boolean = true;
  turmaId;
  aulas: any = [];
  atividades: any = [];
  materiais: any = [];


  constructor(private professorService: ProfessorService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params: any) => {
      this.turmaId = params.get('id');
      this.getTurmas();
      this.getTimeline(this.turmaId);
    });

  }

  ngOnInit(): void {

  }

  get alunodetalhe() {
    if (localStorage.getItem('aluno')) {
      return JSON.parse(localStorage.getItem('aluno'));
    }
  }

  get selectedTurma() {
    if (localStorage.getItem('turmaSelected')) {
      return JSON.parse(localStorage.getItem('turmaSelected'));
    }
  }

  getTimeline(turmaId) {
    forkJoin(this.professorService
      .getTimelineAulas(turmaId), this.professorService
        .getTimelineAtividades(turmaId), this.professorService
          .getTimelineMateriais(turmaId))
      .subscribe((response) => {
        console.log(response);
        let aulas = response[0];

        aulas.forEach(aula => {
          aula.objeto.aovivo = this.compareDates(aula.objeto.dataInicio, aula.objeto.dataFim);
        });

        this.aulas = aulas;
        this.atividades = response[1];
        this.materiais = response[2];

        this.timelineLoading = false;

        console.log('Aulas depois de comparar datas', this.aulas);
      });
  }

  getTurmas() {
    this.professorService
      .getTurmas()
      .subscribe((response) => {
        console.log('Turma detalhe', response);
        this.turmasLoading = false;
        this.turmas = response;
      });
  }

  compareDates(dataInicio, dataFim) {
    let dataAtual = new Date();
    let _dataInicio = new Date(dataInicio);
    let _dataFim = new Date(dataFim);

    if (_dataInicio.getTime() < dataAtual.getTime() && _dataFim.getTime() > dataAtual.getTime()) {
      return true;
    } else {
      return false;
    }

  }

}
