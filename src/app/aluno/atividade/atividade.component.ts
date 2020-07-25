import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlunoService } from '../aluno.service';

import Swal from 'sweetalert2';


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

  constructor(private route: ActivatedRoute, private alunoSerivce: AlunoService) {
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

    this.alunoSerivce
      .getAtividade(atividadeId)
      .subscribe((response) => {
        console.log(response);
        this.isLoading = false;
        this.atividade = response;
      });
  }

  setDefaultValue(alternativas) {
    console.log(alternativas);
  }

  submitForm(formValue) {
    console.log('Atividade ID', this.atividadeId)
    console.log('Turma ID', this.turmaId)
    console.log('Respostas', formValue);

    this.isLoading = true;

    let respostas = [];

    for (const [key, value] of Object.entries(formValue)) {
      console.log(key);
      console.log(value);
      if (key.includes('questaoAberta')) {
        respostas.push({
          'idQuestao': key.split("_").pop(),
          'respostaAberta': value
        });
      } else {
        respostas.push({
          'idQuestao': key.split("_").pop(),
          'respostaAlternativa': value
        });

      }

    }

    let dados = {
      'idTurma': this.turmaId,
      'respostas': respostas
    }

    console.log('DADDOOOOSSS>>>>', dados);

    this.alunoSerivce
      .enviarRespostas(dados, this.atividadeId)
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
