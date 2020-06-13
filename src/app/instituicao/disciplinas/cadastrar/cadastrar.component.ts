import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstituicaoService } from "../../instituicao.service";
import { finalize } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'nb-select-clean',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})

export class CadastroComponent implements OnInit {

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
      descricao: ['', Validators.required],
    });
  }

  submit() {
    this.isLoading = true;
    const result: disciplina = Object.assign({}, this.form.value);
    this.InstituicaoService
      .inserirDisciplina(result)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response) => {

        this.isLoading = false;

        if (response) {
          Swal.fire('Ok', 'Disciplina adicionada com sucesso', 'success');
          this.router.navigateByUrl("/instituicao/disciplinas");
        }
      });
  }

}

export class disciplina {
  nome: string = '';
  descricao: string = '';

}

