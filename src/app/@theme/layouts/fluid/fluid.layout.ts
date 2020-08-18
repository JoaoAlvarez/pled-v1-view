import { Component, OnInit } from '@angular/core';
import { FluidLayoutService } from './fluid.layout.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fluid-layout',
  styleUrls: ['./fluid.layout.scss'],
  templateUrl: 'fluid.layout.html'
})
export class FluidLayoutComponent implements OnInit {

  aluno: any;
  turmas: any = [];
  isLoading: boolean = true;
  selectedTurma: any = '';
  turmaId;

  constructor(private fluidLayoutService: FluidLayoutService, protected router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    //this.getAlunoDetalhe();
  }



}
