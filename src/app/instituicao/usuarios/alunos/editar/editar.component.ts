import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray   } from '@angular/forms';
import { InstituicaoService } from "../../../instituicao.service";
import { finalize } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'alunos-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})

export class AlunosEditarComponent implements OnInit {

  form!: FormGroup;
  isLoading: Boolean = true;
  turmas = [];
  id: string;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private InstituicaoService: InstituicaoService, protected router: Router,

  ) { }



  ngOnInit(): void {
    this.getTurmas();
    this.route.paramMap.subscribe((params: any) => {
      this.id = params.get('id');
      this.createForm();
    });
  }

  getTurmas() {
    this.InstituicaoService
      .getTurmas()
      .subscribe((response) => {
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

  private createForm() {
    this.InstituicaoService
      .getAlunos()
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        this.isLoading = false;
        response.forEach(alunos => {

          if (alunos.id == this.id) {
            this.form = this.formBuilder.group({
              nome: [alunos.nome],
              perfil: ['Aluno'],
              turma: [alunos.turma.id],
              email: [alunos.email],
              cpf: [alunos.cpf],
              dataNascimento: [new DatePipe('en-US').transform(alunos.dataNascimento, 'dd/MM/yyyy')],
              phones: this.formBuilder.group({
                ddd: [alunos.phones[0].ddd],
                phoneNumber: [alunos.phones[0].phoneNumber],
              }),
            });
          }

        });
      });


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

  submit() {
    this.isLoading = true;
    const result: usuario = Object.assign({}, this.form.value);
    this.InstituicaoService
      .inserirAluno(result)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response) => {

        this.isLoading = false;

        if (response) {
          Swal.fire('Ok', 'Aluno atualizado com sucesso', 'success');
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

}

