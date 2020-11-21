import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlunoService } from '../aluno.service';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';

@Component({
  selector: 'ngx-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.scss']
})
export class SalaComponent implements OnInit {

  turmaId;
  fullScreenMode;
  turmaDetalhe;
  isLoading: boolean = true;
  meetUrl: SafeResourceUrl;
  aulas;
  aovivo;

  constructor(private route: ActivatedRoute, private alunoSerivce: AlunoService, public sanitizer: DomSanitizer) {
    this.route.paramMap.subscribe((params: any) => {
      this.turmaId = params.get('id');

      console.log('Turma id sala', this.turmaId);
      this.getTurmaDetalhe(this.turmaId);
      this.getAulas(this.turmaId);
    });
  }

  ngOnInit(): void {
  }


  getTurmaDetalhe(turmaId) {
    this.alunoSerivce
      .getTurmaDetalhe(turmaId)
      .subscribe((response) => {
        console.log(response);
        this.isLoading = false;
        this.turmaDetalhe = response;

        this.meetUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.turmaDetalhe.meet.link);

        console.log('Turma detalhe sala', this.turmaDetalhe);

      });
  }

  getAulas(idTurma) {
    this.alunoSerivce
      .getAulas(idTurma)
      .subscribe((response) => {
        let aulas = response;

        aulas.forEach(aula => {
          if (this.compareDates(aula.objeto.dataInicio, aula.objeto.dataFim)) {
            this.aovivo = aula;
          }
        });

        this.aulas = aulas;
        this.isLoading = false;
      });
  }

  compareDates(dataInicio, dataFim) {
    let dataAtual = new Date();
    let _dataInicio = new Date(dataInicio);
    let _dataFim = new Date(dataFim);
    console.log('dataAtual', dataAtual);
    console.log('dataInicio', _dataInicio);
    console.log('dataFim', _dataFim);

    if (_dataInicio.getTime() < dataAtual.getTime() && _dataFim.getTime() > dataAtual.getTime()) {
      return true;
    } else {
      return false;
    }

  }

}
