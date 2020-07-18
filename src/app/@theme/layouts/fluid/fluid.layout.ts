import { Component, OnInit } from '@angular/core';
import { FluidLayoutService } from './fluid.layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fluid-layout',
  styleUrls: ['./fluid.layout.scss'],
  templateUrl: 'fluid.layout.html'
})
export class FluidLayoutComponent implements OnInit {

  aluno: any;
  turmas: any = [];
  isLoading: boolean = true;
  selectedItem: any = '';

  constructor(private fluidLayoutService: FluidLayoutService, protected router: Router) {
  }

  ngOnInit(): void {
    this.getAlunoDetalhe();
    this.getTurmas();
  }

  getAlunoDetalhe() {
    this.fluidLayoutService
      .getAlunoDetalhe()
      .subscribe((response) => {
        console.log(response);
        this.isLoading = false;
        this.aluno = response;

        localStorage.setItem('aluno', JSON.stringify(this.aluno));
      });
  }

  getTurmas() {
    this.fluidLayoutService
      .getTurmas()
      .subscribe((response) => {
        this.isLoading = false;
        this.turmas = response;
        console.log('Turmas Header', this.turmas);

        this.selectedItem = this.turmas[0].id;

        this.navigateToTurma(this.selectedItem);

      });
  }

  navigateToTurma(turmaId: string) {
    this.router.navigate(['aluno/turma/' + turmaId]);
    localStorage.setItem('turmaSelected', turmaId);

  }

  navigate(url: string) {
    this.router.navigate([url]);
    return false;
  }

  ngOnDestroy(): void {
    localStorage.removeItem('aluno');
  }

}
