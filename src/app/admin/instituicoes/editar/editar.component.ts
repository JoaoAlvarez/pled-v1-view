import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { instituicoesService } from "../instituicoes.service";
import { finalize } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'instituicoes-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})

export class instituicoesEditarComponent implements OnInit {

  form!: FormGroup;
  isLoading: Boolean = false;
  id: string;


  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder, private instituicoesService: instituicoesService, protected router: Router,

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.id = params.get('id');
      this.createForm();
    });
  }


  private createForm() {
    this.instituicoesService
      .getInstituicoes()
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        this.isLoading = false;
        response.forEach(instituicoes => {

          if (instituicoes.id == this.id) {
            this.form = this.formBuilder.group({
              nome: [instituicoes.nome],
              cnpj: [instituicoes.cnpj],
              responsavel: this.formBuilder.group({
                nome: [instituicoes.responsavel.nome],
                email: [instituicoes.responsavel.email],
                cpf: [instituicoes.responsavel.cpf],
              }),
              endereco: this.formBuilder.group({
                rua: [instituicoes.endereco.rua],
                bairro: [instituicoes.endereco.bairro],
                cidade: [instituicoes.endereco.cidade],
                numero: [instituicoes.endereco.numero],
                uf: [instituicoes.endereco.uf]
              })
            });
          }

        });
      });



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
          Swal.fire('Ok', 'Escola atualizada com sucesso', 'success');
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
