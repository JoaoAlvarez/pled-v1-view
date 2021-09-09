import { disciplina } from './../../../disciplinas/editar/editar.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { InstituicaoService } from "../../../instituicao.service";
import { finalize } from 'rxjs/operators';
import { LocalDataSource } from "ng2-smart-table";


import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'professores-adicionar',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.scss']
})

export class ProfessoresAdicionarComponent implements OnInit {

  form!: FormGroup;
  isLoading: Boolean = true;
  productForm: FormGroup;
  turmas = [];
  disciplinas = [];
  id;

  //joao
  professor;
  disciplinaToAdd;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private instituicaoService: InstituicaoService, protected router: Router) {
    this.route.paramMap.subscribe((params: any) => {
      this.id = params.get('id');
      this.getDisciplinas();
      this.getTurmas();
      if (this.id) {
        this.getProfessorDetails();
      } else {
        this.createForm();
      }
    });
  }

  ngOnInit(): void {
  }

  getTurmas() {
    this.instituicaoService
      .getTurmas()
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        //this.turmas = response;
        this.isLoading = false;
        response.forEach(element => {
          element.series.forEach(element => {
            element.turmas.forEach(element => {
              this.turmas.push(element);

            });

          });
        });

        console.log(this.turmas);
      });
  }

  getDisciplinas() {
    this.instituicaoService
      .getDisciplinas()
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        this.disciplinas = response;
      });
  }

  get turmasDisciplinas() {
    return this.form.get('turmasDisciplinas') as FormArray;
  }

  addTurmasDisciplinas(dados?) {
    console.log(dados);
    this.turmasDisciplinas.push(this.formBuilder.group({
      turma: [dados ? dados.id : '', Validators.required],
      disciplina: [dados ? dados.disciplinas[0].idDisciplina : '', Validators.required]
    }));

  }

  deleteTurmasDisciplinas(index) {
    this.turmasDisciplinas.removeAt(index);
  }

  getProfessorDetails() {
    this.professor = undefined;
    this.isLoading = true;
    this.instituicaoService
      .getProfessorId(this.id)
      .pipe(finalize(() => { this.isLoading = false;}))
      .subscribe((response) => {
        this.isLoading = false;
        this.carregarDadosProfessor(response);

      }

      );


  }

  private carregarDadosProfessor(response: any) {
    this.professor = response;

    this.createForm(this.professor);

    console.log(this.professor);

    if (this.professor) {
      this.professor.turmasDoProfessor.forEach(element => {
        this.addTurmasDisciplinas(element);
      });
    }
  }

  private createForm(professor?) {
    this.form = this.formBuilder.group({
      id: [professor ? professor.id : ''],
      nome: [professor ? professor.nome : '', Validators.required],
      perfil: [professor ? professor.perfil : '', Validators.required],
      email: [professor ? professor.email : '', [Validators.required, Validators.email]],
      cpf: [professor ? professor.cpf : '', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      turmasDisciplinas: this.formBuilder.array([])
    });

    if (professor) {
      this.turmasDisciplinas.push
    }
  }

  Adicionar() {
    this.isLoading = true;
    const result: usuario = Object.assign({}, this.form.value);
    console.log(result);

    if (!this.id) {

      this.instituicaoService
        .inserirProfessor(result)
        .pipe(finalize(() => { this.isLoading = false; }))
        .subscribe((response) => {

          this.isLoading = false;

          if (response) {
            Swal.fire('Ok', 'Professor adicionada com sucesso', 'success');
            this.router.navigateByUrl("/instituicao/usuarios/professores");

          }



        });
    } else {

      this.instituicaoService
        .editarProfessor(result)
        .pipe(finalize(() => { this.isLoading = false; }))
        .subscribe((response) => {


          // result.turmasDisciplinas.forEach(element => {
          //   console.log(element);
          //   let data = {
          //     "idProfessor": result.id,
          //     "idDisciplina": element.disciplina
          //   }

      //     this.instituicaoService
      // .inserirProfessorDisciplina(data)
      // .pipe(finalize(() => { this.isLoading = false; }))
      // .subscribe((response) => {

      //   console.log(response);
      // });
          // });

          if (response) {
            Swal.fire('Ok', 'Professor editado com sucesso', 'success');
            this.router.navigateByUrl("/instituicao/usuarios/professores");

          }

          this.isLoading = false;

        });
    }

  }

  removerDisciplina(professorDisciplina){
    console.log(professorDisciplina);
    this.isLoading = true;
    this.instituicaoService
    .deleteProfessorDisciplina(professorDisciplina.idProfessorDisciplina)
    .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response) => {
        alert(response.message);
        this.getProfessorDetails();
      });
  }

  inserirDisciplina(){
    this.isLoading = true;
    this.instituicaoService
    .inserirProfessorDisciplina(this.id, this.disciplinaToAdd )
    .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response) => {
        this.carregarDadosProfessor(response);
        this.disciplinaToAdd = undefined;
      });
  }



}

export class usuario {
  id?: string = ''
  nome: string = ''
  cpf: string = ''
  email: string = '';
  perfil: string = '';
  turmasDisciplinas: any = [];
}

