import { Component, OnInit } from '@angular/core';
import { AlunoService } from './aluno.service';
import { FluidLayoutService } from '../@theme/layouts/fluid/fluid.layout.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.scss']
})
export class AlunoComponent implements OnInit {

  aluno: any;
  isLoading: boolean = true;
  turmas: any = [];
  selectedTurma: any = '';
  turmaId;


  constructor(private fluidLayoutService: FluidLayoutService, protected router: Router, private route: ActivatedRoute) {
    console.log(this.router.url);
    if (this.router.url.includes('/aluno/turma/') || this.router.url === '/aluno') {
      this.getTurmas(true);
    } else {
      this.getTurmas(false);
    }

  }

  ngOnInit(): void {
    this.getAlunoDetalhe();
  }

  getAlunoDetalhe() {
    this.fluidLayoutService
      .getAlunoDetalhe()
      .subscribe((response) => {
        this.isLoading = false;
        this.aluno = response;
        localStorage.setItem('aluno', JSON.stringify(this.aluno));
      });
  }

  getTurmas(redirect: boolean) {
    this.fluidLayoutService
      .getTurmas()
      .subscribe((response) => {
        this.isLoading = false;
        this.turmas = response;

        if (localStorage.getItem('turmaSelected')) {
          let turmaSelected = JSON.parse(localStorage.getItem('turmaSelected'));
          let turmaSelectedFiltered = this.turmas.filter(turma => turma.id == turmaSelected.id);
          this.selectedTurma = turmaSelectedFiltered[0];
        } else {
          this.selectedTurma = this.turmas[0];
        }

        if (redirect) {
          this.navigateToTurma(this.selectedTurma);
        }

      });
  }

  navigateToTurma(turma) {
    this.router.navigate(['/aluno/turma/' + turma.id]);
    localStorage.setItem('turmaSelected', JSON.stringify(turma));
  }

  navigate(url: string) {
    this.router.navigate([url]);
    return false;
  }

  ngOnDestroy(): void {
    localStorage.removeItem('aluno');
  }




}
