import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray  } from '@angular/forms';
import { InstituicaoService } from "../../../instituicao.service";
import { finalize } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'alunos-adicionar',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.scss']
})

export class AlunosAdicionarComponent implements OnInit {

  form!: FormGroup;
  isLoading: Boolean = true;
  turmas = [];
  ngrupo = [];
  idgrupo = [];

  constructor(private formBuilder: FormBuilder, private InstituicaoService: InstituicaoService, protected router: Router,

  ) { }



  ngOnInit(): void {
    this.getTurmas();
    this.createForm();
  }
  getTurmas() {
    this.InstituicaoService
      .getTurmas()
      .subscribe((response) => {
        this.isLoading = false;
        response.forEach(grupos => {
          grupos.series.forEach(series => {
            series.turmas.forEach(turma => {


              this.turmas.push(turma)

            });
          });
        });
      })
  }
  get phones() {
    return this.form.get('phones') as FormGroup;
  }

  phonelist=[];
  
  private createForm() {
    // this.form = this.formBuilder.group({
    //   nome: ['', Validators.required],
    //   cnpj: ['', Validators.required],
    //   responsavel: ['', Validators.required],
    // });
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      perfil: ['Aluno'],
      turma: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      dataNascimento: ['', Validators.required],
      phones: this.formBuilder.group({
        ddd: ['', Validators.required],
        phoneNumber: ['', Validators.required],
      }),
    });
  }

  Adicionar() {
    this.isLoading = true;
    const result: usuario = Object.assign({}, this.form.value);
    this.InstituicaoService
      .inserirAluno(result)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response) => {

        this.isLoading = false;

        if (response) {
          Swal.fire('Ok', 'Aluno adicionada com sucesso', 'success');
          this.router.navigateByUrl("/instituicao/usuarios/alunos");

        }



      });

  }


}

export class usuario {
  nome: string = ''
  perfil: string = 'Aluno'
  turma: string = ''
  cpf: string = ''
  email: string = '';
  dataNascimento: string = '';
  phones: any = [];

}

