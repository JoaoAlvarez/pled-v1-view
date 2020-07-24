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
    console.log('Aluno detalhe na home', this.alunodetalhe);
  }

  get alunodetalhe() {
    if (localStorage.getItem('aluno')) {
      return JSON.parse(localStorage.getItem('aluno'));
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
    forkJoin(this.alunoSerivce
      .getAulas(turmaId), this.alunoSerivce
        .getAtividades(turmaId), this.alunoSerivce
          .getMateriais(turmaId))
      .subscribe((response) => {
        console.log(response);
        this.aulas = response[0];
        this.atividades = response[1];
        this.materiais = response[2];

        this.timelineLoading = false;
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

}
