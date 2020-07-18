import { Component, OnInit } from '@angular/core';
import { AlunoService } from './aluno.service';

@Component({
  selector: 'aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.scss']
})
export class AlunoComponent implements OnInit {

  aluno: any;
  isLoading: boolean = true;

  constructor(private alunoService: AlunoService) { }

  ngOnInit(): void {
    //this.getAlunoDetalhe();
  }




}
