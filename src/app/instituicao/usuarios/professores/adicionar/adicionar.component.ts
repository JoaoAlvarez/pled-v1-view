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

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private InstituicaoService: InstituicaoService, protected router: Router) {
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
    this.InstituicaoService
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
    this.InstituicaoService
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
    this.InstituicaoService
      .getProfessorId(this.id)
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        this.isLoading = false;
        let professor = response;

        this.createForm(professor);

        console.log(professor);

        if (professor) {
          professor.turmasDoProfessor.forEach(element => {
            this.addTurmasDisciplinas(element);
          });
        }

      }

      );


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

      this.InstituicaoService
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

      this.InstituicaoService
        .editarProfessor(result)
        .pipe(finalize(() => { this.isLoading = false; }))
        .subscribe((response) => {


          // result.turmasDisciplinas.forEach(element => {
          //   console.log(element);
          //   let data = {
          //     "idProfessor": result.id,
          //     "idDisciplina": element.disciplina
          //   }

          //   this.inserirProfessorDisciplina(data);
          // });

          if (response) {
            Swal.fire('Ok', 'Professor editado com sucesso', 'success');
            this.router.navigateByUrl("/instituicao/usuarios/professores");

          }

          this.isLoading = false;

        });
    }

  }

  inserirProfessorDisciplina(data) {
    this.InstituicaoService
      .inserirProfessorDisciplina(data)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response) => {

        console.log(response);
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

