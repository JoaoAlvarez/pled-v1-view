import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfessorService } from '../professor.service';

import Swal from 'sweetalert2';
import { fireOnInitToken } from '@sweetalert2/ngx-sweetalert2/lib/di';


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

    this.professorService
      .getAtividade(atividadeId)
      .subscribe((response) => {
        console.log(response);
        this.isLoading = false;
        this.atividade = response;

        // this.atividade.questoes.forEach(questao => {

        //   let respostasAlunos: any[] = [];

        //   if (!questao.isMultiplaEscolha) {
        //     questao.respostasAlunos.forEach(respostaAluno => {
        //       respostasAlunos.push({
        //         id: respostaAluno.idResposta,
        //         acertou: '',
        //         respostaAluno: respostaAluno.respostaAberta,
        //         comentarioProfessor: ''
        //       })

        //     });
        //   }
        // });

        //this.getRespostasAlunos(this.atividade.questoes);
      });
  }

  // getRespostasAlunos(questoes) {

  // }

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
