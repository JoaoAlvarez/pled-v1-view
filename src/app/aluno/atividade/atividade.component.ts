import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService } from '../aluno.service';
import { Location } from '@angular/common';

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

  constructor(private route: ActivatedRoute, private alunoSerivce: AlunoService, private _location: Location, protected router: Router,
  ) {
    this.route.paramMap.subscribe((params: any) => {
      this.atividadeId = params.get('id');
      this.turmaId = params.get('turmaid');

      console.log('Turma id sala', this.atividadeId);
      this.getAtividade(this.atividadeId);
    });
  }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigate(['/']);

    return false;

  }

  getAtividade(atividadeId) {
    this.isLoading = true;

    this.alunoSerivce
      .getAtividade(atividadeId)
      .subscribe((response) => {
        this.isLoading = false;
        this.atividade = response;
      });
  }

  submitForm(formValue) {

    this.isLoading = true;

    let respostas = [];

    for (const [key, value] of Object.entries(formValue)) {
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
