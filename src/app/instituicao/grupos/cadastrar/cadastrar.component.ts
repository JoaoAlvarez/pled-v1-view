import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstituicaoService } from "../../instituicao.service";
import { finalize } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'grupos-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})

export class GruposCadastrarComponent implements OnInit {

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
    });
  }

  submit() {
    this.isLoading = true;
    const result: grupo = Object.assign({}, this.form.value);
    this.InstituicaoService
      .inserirGrupo(result)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response) => {

        this.isLoading = false;

        if (response) {
          Swal.fire('Ok', 'Grupo adicionado com sucesso', 'success');
          this.router.navigateByUrl("/instituicao/grupos");
        }
      });
  }

}

export class grupo {
  nome: string = '';

}

