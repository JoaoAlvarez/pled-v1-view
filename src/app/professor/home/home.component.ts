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
  timelineLoading: boolean = true;
  turmaId;
  aulas: any = [];
  atividades: any = [];
  professorDetalhe;


  constructor(private professorService: ProfessorService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params: any) => {
      this.turmaId = params.get('id');
      this.getTimeline(this.turmaId);
    });

    this.professorDetalhe = this.professorService.professorDetalhe;

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
        .getTimelineAtividades(turmaId))
      .subscribe((response) => {

        this.filtrarAulas(response[0]);
        this.filtrarAtividades(response[1]);



        this.timelineLoading = false;

      });
  }

  filtrarAtividades(atividades) {
    this.atividades = atividades.filter((atividade) => atividade.objeto.professor == this.professorDetalhe.id);
  }

  filtrarAulas(aulas) {

    aulas = aulas.filter((aula) => aula.disciplina.professor.id == this.professorDetalhe.id);

    aulas.forEach(aula => {
      aula.objeto.aovivo = this.compareDates(aula.objeto.dataInicio, aula.objeto.dataFim);
    });

    this.aulas = aulas;
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
