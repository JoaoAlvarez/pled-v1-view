import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstituicaoService } from "../../instituicao.service";
import { finalize } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'nb-select-clean',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})

export class EditarAlunoComponent implements OnInit {

  form!: FormGroup;
  isLoading: Boolean = true;
  turmas = [];
  ngrupo = [];
  idgrupo = [];
  aluno=[];

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
        response.forEach(grupos => {
          grupos.series.forEach(series => {
            series.turmas.forEach(turma => {


              this.turmas.push(turma)

            });
          });
        });
      })
  }
  

  id:string;
  private createForm() {
    this.InstituicaoService
      .getAlunos()
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        this.isLoading=false;
         response.forEach(alunos => {
           var t =this.router.url.split("/",5);
          if(alunos.id==t[4]){

              //this.aluno.push(alunos)

              this.form = this.formBuilder.group({
                nome: [alunos.nome],
                perfil: ['Aluno'],
                turma: [alunos.turma.id],
                email: [alunos.email],
                cpf: [alunos.cpf],
              });
            this.aluno.push(alunos.id,alunos.nome,alunos.turma.id,alunos.cpf,alunos.email)
            
          }
          
        });
      });
    
    console.log(this.aluno.length);
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      perfil: ['Aluno'],
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

