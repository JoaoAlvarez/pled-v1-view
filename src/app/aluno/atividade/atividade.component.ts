import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlunoService } from '../aluno.service';

@Component({
  selector: 'ngx-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.scss']
})
export class AtividadeComponent implements OnInit {

  isLoading: boolean = true;
  atividadeId;
  atividade;

  constructor(private route: ActivatedRoute, private alunoSerivce: AlunoService) {
    this.route.paramMap.subscribe((params: any) => {
      this.atividadeId = params.get('id');

      console.log('Turma id sala', this.atividadeId);
      this.getAtividade(this.atividadeId);
    });
  }

  ngOnInit(): void {
  }

  getAtividade(turmaId) {
    this.alunoSerivce
      .getAtividade(turmaId)
      .subscribe((response) => {
        console.log(response);
        this.isLoading = false;
        this.atividade = response;
      });
  }

}
