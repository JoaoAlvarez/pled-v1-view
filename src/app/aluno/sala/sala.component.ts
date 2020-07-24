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
  turmaDetalhe;
  isLoading: boolean = true;
  meetUrl: SafeResourceUrl;

  constructor(private route: ActivatedRoute, private alunoSerivce: AlunoService, public sanitizer: DomSanitizer) {
    this.route.paramMap.subscribe((params: any) => {
      this.turmaId = params.get('id');

      console.log('Turma id sala', this.turmaId);
      this.getTurmaDetalhe(this.turmaId);
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

}
