import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstituicaoService } from "../../instituicao.service";
import { finalize } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { instituicao } from '../../../admin/instituicoes/adicionar/adicionar.component';
import { isNgContainer } from '@angular/compiler';


@Component({
  selector: 'turmas-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})

export class TurmasCadastrarComponent implements OnInit {


  form!: FormGroup;
  isLoading: Boolean = true;
  options = [];
  series = [];
  constructor(private formBuilder: FormBuilder, private InstituicaoService: InstituicaoService, protected router: Router,

  ) { }


  ngOnInit(): void {
    //this.getSeries();
    this.getCoordenadores();

  }

  getSeries() {
    this.InstituicaoService
      .getSeries()
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        console.log(response);
        this.series = response;
      });
  }

  getCoordenadores() {
    this.InstituicaoService
      .getCoordenadores()
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        this.isLoading = false;
        console.log(response);
        this.options = response;
        this.createForm();
      });
  }

  private createForm() {
    // this.form = this.formBuilder.group({
    //   nome: ['', Validators.required],
    //   cnpj: ['', Validators.required],
    //   responsavel: ['', Validators.required],
    // });
    this.form = this.formBuilder.group({
      grupo: ['', Validators.required],
      serie: [1, Validators.required],
      nome: ['', Validators.required],
      turno: ['', Validators.required],
      coordenador: ['', Validators.required],
    });
  }

  submit() {

    console.log("response", this.form.value)

    this.isLoading = true;
    const result: turmas = Object.assign({}, this.form.value);
    this.InstituicaoService
      .inserirTurma(result)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response) => {

        this.isLoading = false;

        if (response) {
          Swal.fire('Ok', 'Turma adicionada com sucesso', 'success');
          this.router.navigateByUrl("/instituicao/turmas");

        }



      });

  }


}
export class SelectShowcaseComponent {

}
export class turmas {
  grupo: string = '';
  serie: number = 1;
  nome: string = '';
  turno: string = '';
  coordenador: string = '';

}

