import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstituicaoService } from "../../instituicao.service";
import { finalize } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'nb-select-clean',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.scss']
})

export class AdicionarAlunoComponent implements OnInit {

  form!: FormGroup;
  isLoading: Boolean = false;


  constructor(private formBuilder: FormBuilder, private InstituicaoService: InstituicaoService, protected router: Router,

  ) { }
  lists = [];
  turmas = [];
  sgrupo =[];


  ngOnInit(): void {
    this.getTurmas();
    this.createForm();
  }
  getTurmas() {
    this.InstituicaoService
      .getTurmas()
      .subscribe((response) => {
        this.lists = response;
        this.lists.forEach(element => {
          element.series.forEach(element2 => {
            this.turmas.push(element2.turmas);
            
            this.turmas.forEach(element3 => {
              element3.forEach(element4 => {
                if (!this.sgrupo.find(o => o === element4.nome)){

                    this.sgrupo.push(element4.nome)
                    console.log(this.sgrupo);
                }
                
              });
            });
          });
        });
      })
  }

  private createForm() {
    // this.form = this.formBuilder.group({
    //   nome: ['', Validators.required],
    //   cnpj: ['', Validators.required],
    //   responsavel: ['', Validators.required],
    // });
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      turma: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    });
  }

  submit() {
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
  turma: string = ''
  cpf: string = ''
  email: string = '';

}

