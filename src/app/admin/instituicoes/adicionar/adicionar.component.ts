import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { instituicoesService } from "../instituicoes.service";
import { finalize } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'instituicoes-adicionar',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.scss']
})

export class instituicoesAdicionarComponent implements OnInit {

  form!: FormGroup;
  isLoading: Boolean = false;


  constructor(private formBuilder: FormBuilder, private instituicoesService: instituicoesService, protected router: Router,

  ) { }

  ngOnInit(): void {
    this.createForm();
  }


  private createForm() {
    // this.form = this.formBuilder.group({
    //   nome: ['', Validators.required],
    //   cnpj: ['', Validators.required],
    //   responsavel: ['', Validators.required],
    // });
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      cnpj: ['', Validators.required],
      responsavel: this.formBuilder.group({
        nome: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      }),
      endereco: this.formBuilder.group({
        rua: ['', Validators.required],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        numero: ['', Validators.required],
        uf: ['', Validators.required]
      })
    });
  }

  submit() {
    this.isLoading = true;
    const result: instituicao = Object.assign({}, this.form.value);
    this.instituicoesService
      .inserirInstituicao(result)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response) => {

        this.isLoading = false;

        if (response) {
          Swal.fire('Ok', 'Escola adicionada com sucesso', 'success');
          this.router.navigateByUrl("/instituicoes/listar");

        }



      });

  }


}

export class instituicao {
  nome: string = ''
  cnpj: string = ''
  responsavel: responsavel = new responsavel()
  endereco: endereco = new endereco()
}

export class endereco {
  rua: string = ''
  bairro: string = ''
  cidade: string = ''
  numero: string = ''
  uf: string = ''
}

export class responsavel {
  nome: string = '';
  email: string = '';
  cpf: string = '';
}
