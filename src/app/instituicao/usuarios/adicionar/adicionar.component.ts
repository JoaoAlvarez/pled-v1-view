import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { InstituicaoService } from "../../instituicao.service";
import { finalize } from 'rxjs/operators';
import { LocalDataSource } from "ng2-smart-table";


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
  productForm: FormGroup;
  turmas = [];
  disciplinas = [];

  constructor(private formBuilder: FormBuilder, private InstituicaoService: InstituicaoService, protected router: Router) { }

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

    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      perfil: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      turmasDisciplinas: this.formBuilder.array([])
    });
  }

  Adicionar() {
    this.isLoading = true;
    const result: usuario = Object.assign({}, this.form.value);
    this.InstituicaoService
      .inserirInstituicao(result)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response) => {

        this.isLoading = false;

        if (response) {
          Swal.fire('Ok', 'Professor adicionada com sucesso', 'success');
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

