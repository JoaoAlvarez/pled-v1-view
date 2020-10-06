import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../aluno.service';
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


  constructor(private alunoSerivce: AlunoService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params: any) => {
      this.turmaId = params.get('id');
      this.getDisciplinas(this.turmaId);
      this.getTimeline(this.turmaId);
      //this.getSimulados(this.turmaId);
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

  // getTurmaDetalhe() {
  //   this.alunoSerivce
  //     .getTurmaDetalhe(this.turmaId)
  //     .subscribe((response) => {
  //       console.log(response);
  //       //this.getTurmaDetalhe(response.id);
  //       this.turmasLoading = false;
  //       this.turmas = response;

  //       //this.disciplinas = response.filter(turma => turma.id == this.turmaId);

  //       console.log('Disciplinas filtradas home', this.disciplinas);

  //     });
  // }

  getTimeline(turmaId) {
    forkJoin([this.alunoSerivce
      .getAulas(turmaId), this.alunoSerivce
        .getAtividades(turmaId), this.alunoSerivce
          .getMateriais(turmaId)])
      .subscribe((response) => {
        console.log(response);
        let aulas = response[0];

        aulas.forEach(aula => {
          aula.objeto.aovivo = this.compareDates(aula.objeto.dataInicio, aula.objeto.dataFim);
        });

        this.aulas = aulas;
        this.atividades = response[1];
        this.atividades = this.atividades.sort((a, b) => { return <any>new Date(b.objeto.prazoFinal) - <any>new Date(a.objeto.prazoFinal) })
        this.materiais = response[2];

        this.timelineLoading = false;

      });
  }

  getDisciplinas(idTurma) {
    this.alunoSerivce
      .getDisciplinas(idTurma)
      .subscribe((response) => {
        console.log('Turma detalhe', response);

        let disciplinas = response;
        let disciplinasFiltradas = [];

        disciplinas.forEach(disciplina => {
          console.log(disciplina);
          console.log(disciplinasFiltradas);
          if (!disciplinasFiltradas.some(disciplinaFiltrada => disciplinaFiltrada.nome === disciplina.nome)) {
            disciplinasFiltradas.push(disciplina);
          }
        });

        console.log('Disciplinas Filtradas', disciplinasFiltradas);

        this.turmasLoading = false;
        this.disciplinas = disciplinasFiltradas;
      });
  }

  getSimulados(idTurma) {
    this.alunoSerivce
      .getSimulados(idTurma)
      .subscribe((response) => {
        this.simulados = response;
        this.simulados = this.simulados.sort((a, b) => { return <any>new Date(b.objeto.prazoFinal) - <any>new Date(a.objeto.prazoFinal) })
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
