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

export class AdicionarComponent implements OnInit {

  form!: FormGroup;
  isLoading: Boolean = false;


  constructor(private formBuilder: FormBuilder, private InstituicaoService: InstituicaoService, protected router: Router,

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
      perfil: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    });
  }

  submit() {
    this.isLoading = true;
    const result: usuario = Object.assign({}, this.form.value);
    this.InstituicaoService
      .inserirInstituicao(result)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response) => {

        this.isLoading = false;

        if (response) {
          Swal.fire('Ok', 'Usuário adicionada com sucesso', 'success');
          this.router.navigateByUrl("/instituicao/usuarios/alunos");

        }



      });

  }


}

export class usuario {
  nome: string = ''
  cpf: string = ''
  email: string = '';

}

