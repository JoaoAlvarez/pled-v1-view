import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { InstituicaoService } from "../../../instituicao.service";
import { finalize } from 'rxjs/operators';
import { LocalDataSource } from "ng2-smart-table";


import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'nb-select-clean',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})

export class EditarProfessorComponent implements OnInit {

  form!: FormGroup;
  isLoading: Boolean = true;
  productForm: FormGroup;
  turmas = [];
  disciplinas = [];
  id;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private InstituicaoService: InstituicaoService, protected router: Router) {
    this.route.paramMap.subscribe((params: any) => {
      this.id = params.get('id');
      this.createForm();
    });

  }

  ngOnInit(): void {
    this.getDisciplinas();
    this.getTurmas();
    this.createForm();
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

  addTurmasDisciplinas() {
    this.turmasDisciplinas.push(this.formBuilder.group({
      turma: ['', Validators.required],
      disciplina: ['', Validators.required]
    }));
  }

  deleteTurmasDisciplinas(index) {
    this.turmasDisciplinas.removeAt(index);
  }

  private createForm() {
    this.InstituicaoService
      .getProfessorId(this.id)
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        this.isLoading = false;
        let professores = response;

        this.form = this.formBuilder.group({
          nome: [professores.nome],
          //perfil: [professores.perfil],
          email: [professores.email],
          cpf: [professores.cpf],
          //turmasDisciplinas: this.formBuilder.array([])
        });

      }

      );

    // this.form = this.formBuilder.group({
    //   nome: ['', Validators.required],
    //   perfil: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    //   cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    //   turmasDisciplinas: this.formBuilder.array([])
    // });
  }

  Adicionar() {
    this.isLoading = true;
    const result: usuario = Object.assign({}, this.form.value);
    this.InstituicaoService
      .inserirProfessor(result)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response) => {

        this.isLoading = false;

        if (response) {
          Swal.fire('Ok', 'Professor atualizado com sucesso', 'success');
          this.router.navigateByUrl("/instituicao/usuarios/professores");

        }



      });

  }


}

export class usuario {
  nome: string = ''
  cpf: string = ''
  email: string = '';
  perfil: string = '';
  turmasDisciplinas: any = [];
}

