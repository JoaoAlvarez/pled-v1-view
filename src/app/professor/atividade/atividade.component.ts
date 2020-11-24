import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfessorService } from '../professor.service';

import Swal from 'sweetalert2';
import { fireOnInitToken } from '@sweetalert2/ngx-sweetalert2/lib/di';
import { forkJoin } from 'rxjs';
import { LocalDataSource } from "ng2-smart-table";


@Component({
  selector: 'ngx-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.scss']
})
export class AtividadeComponent implements OnInit {

  isLoading: boolean = true;
  atividadeId;
  turmaId;
  atividade;
  respostasAlunos;
  strRespostaProfessor = 'Aguardando correção do professor';

  settings = {
    hideSubHeader: true,
    noDataMessage: 'Não há nenhum dado para exibir',

    actions: {
      add: false,
      position: "right",
      columnTitle: "Ações",
      edit: false,
      delete: false
    },
    columns: {
      aluno: {
        title: "Aluno",
        type: "string",
        editable: false,
        valuePrepareFunction: (aluno, row) => {
          return aluno.nome
        }
      },
      pontuacaoObtida: {
        title: "Pontuação na atividade",
        type: "string",
        editable: false,
      },

    },
  };

  source: LocalDataSource = new LocalDataSource();

  public teste: any[] = [{
    id: '',
    acertou: '',
    comentarioProfessor: ''
  }];

  constructor(private route: ActivatedRoute, private professorService: ProfessorService) {
    this.route.paramMap.subscribe((params: any) => {
      this.atividadeId = params.get('id');
      this.turmaId = params.get('turmaid');

      console.log('Turma id sala', this.atividadeId);
      this.getAtividade(this.atividadeId);
    });
  }

  ngOnInit(): void {
  }

  getAtividade(atividadeId) {
    this.isLoading = true;

    forkJoin([this.professorService
      .getAtividade(atividadeId), this.professorService
        .getRespostasAlunos(atividadeId)])
      .subscribe((response) => {

        this.isLoading = false;
        this.atividade = response[0];
        this.respostasAlunos = response[1];
        this.source.load(this.respostasAlunos);


      });
  }


  getValueOfKey(values) {
    for (const [key, value] of Object.entries(values)) {
      if (key.includes('acertou')) {
        return value;
      }
    }
  }

  submitForm(formValue) {

    this.isLoading = true;


    let respostas = [];


    for (const [key, value] of Object.entries(formValue)) {

      let values = value;
      let respostasAlunos = [];


      for (const [key, value] of Object.entries(values)) {
        console.log('respostaAluno', key);
        console.log('respostaAlunoValues', value);

        if (value.comentarioProfessor && (this.getValueOfKey(value) != undefined)) {
          respostasAlunos.push({
            id: key,
            comentarioProfessor: value.comentarioProfessor,
            acertou: this.getValueOfKey(value)
          })
        }

      }

      if (respostasAlunos.length != 0) {
        respostas.push({
          id: key,
          respostasAlunos: respostasAlunos
        })
      }


    }

    console.log('Respostas >>>>', respostas);

    this.professorService
      .enviarRespostas(this.atividadeId, respostas)
      .subscribe((response) => {

        this.isLoading = false;
        if (response) {
          Swal.fire('Ok', 'Atividade respondida com sucesso', 'success');
          this.getAtividade(this.atividadeId);
        }

      }, error => {
        this.isLoading = false;
      });

  }

}
