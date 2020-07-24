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
  selectedItem: any = '';
  turmaId;

  constructor(private fluidLayoutService: FluidLayoutService, protected router: Router, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params: any) => {
      this.turmaId = params.get('id');
      console.log(this.turmaId);
    });
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

        this.selectedItem = this.turmas[0];

        this.navigateToTurma(this.selectedItem);

      });
  }

  navigateToTurma(turma) {
    this.router.navigate(['aluno/turma/' + turma.id]);
    localStorage.setItem('turmaSelected', turma);
  }

  navigate(url: string) {
    this.router.navigate([url]);
    return false;
  }

  ngOnDestroy(): void {
    localStorage.removeItem('aluno');
  }

}
