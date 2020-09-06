import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './professor-menu';
import { FluidLayoutService } from '../@theme/layouts/fluid/fluid.layout.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfessorService } from './professor.service';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'ngx-professor',
  templateUrl: './professor.component.html'
})
export class ProfessorComponent implements OnInit {

  menu = MENU_ITEMS;

  professor: any;
  isLoading: boolean = true;
  turmas: any = [];
  selectedTurma: any = '';
  turmaId;


  constructor(private professorService: ProfessorService, protected router: Router, private route: ActivatedRoute, private sidebarService: NbSidebarService,
  ) {
    console.log(this.router.url);
    if (this.router.url.includes('/professor/home/') || this.router.url === '/professor') {
      this.getTurmas(true);
    } else {
      this.getTurmas(false);
    }

  }

  ngOnInit(): void {
    this.getProfessorDetalhes();

  }

  getProfessorDetalhes() {
    this.professorService
      .getProfessorDetalhes()
      .subscribe((response) => {
        this.isLoading = false;
        this.professor = response;
        localStorage.setItem('professor', JSON.stringify(this.professor));
      });
  }

  getTurmas(redirect: boolean) {
    this.professorService
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
    console.log('Select turma', turma);
    this.router.navigate(['/professor/home/' + turma.id]);
    localStorage.setItem('turmaSelected', JSON.stringify(turma));
  }

  navigate(url: string) {
    this.router.navigate([url]);
    return false;
  }

  ngOnDestroy(): void {
    localStorage.removeItem('professor');
  }

}
