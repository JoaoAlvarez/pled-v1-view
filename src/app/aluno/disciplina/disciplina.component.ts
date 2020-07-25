import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../aluno.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'ngx-disciplina',
  templateUrl: './disciplina.component.html',
  styleUrls: ['./disciplina.component.scss']
})
export class DisciplinaComponent implements OnInit {

  disciplinas: any = [];
  simulados: any = [];
  turmas: any = [];
  turmasLoading: boolean = true;
  timelineLoading: boolean = true;
  turmaId;
  disciplinaId;
  aulas: any = [];
  atividades: any = [];
  materiais: any = [];


  constructor(private alunoSerivce: AlunoService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params: any) => {
      this.disciplinaId = params.get('id');
      this.turmaId = params.get('turmaid');
      // this.getDisciplinas(this.turmaId);
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
    forkJoin(this.alunoSerivce
      .getAulas(turmaId), this.alunoSerivce
        .getAtividades(turmaId), this.alunoSerivce
          .getMateriais(turmaId))
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

  getDisciplinas(idTurma) {
    this.alunoSerivce
      .getDisciplinas(idTurma)
      .subscribe((response) => {
        console.log('Turma detalhe', response);
        this.turmasLoading = false;
        this.disciplinas = response;
      });
  }

  getSimulados(idTurma) {
    this.alunoSerivce
      .getSimulados(idTurma)
      .subscribe((response) => {
        this.simulados = response;
      });
  }

  compareDates(dataInicio, dataFim) {
    let dataAtual = new Date();
    let _dataInicio = new Date(dataInicio);
    let _dataFim = new Date(dataFim);
    console.log('dataAtual', dataAtual);
    console.log('dataInicio', _dataInicio);
    console.log('dataFim', _dataFim);

    if (_dataInicio.getTime() < dataAtual.getTime() && _dataFim.getTime() > dataAtual.getTime()) {
      return true;
    } else {
      return false;
    }

  }

}
