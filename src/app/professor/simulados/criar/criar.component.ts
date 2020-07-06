import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProfessorService } from "../../professor.service";
import { finalize } from 'rxjs/operators';
import { NbCalendarRange, NbDateService, } from '@nebular/theme';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'nb-select-clean',
  templateUrl: './criar.component.html',
  styleUrls: ['./criar.component.scss']
})

export class CriarComponent implements OnInit {

  form!: FormGroup;
  formSimuladoTurma!: FormGroup;
  isLoading: Boolean = true;
  turmas = [];
  disciplinas = [];

  constructor(private formBuilder: FormBuilder, private ProfessorService: ProfessorService, protected router: Router) {

  }

  ngOnInit(): void {
    this.getTurmasProfessor();
    this.createForm();
  }

  get questoes() {
    return this.form.get('questoes') as FormArray;
  }

  getTurmasProfessor() {
    this.ProfessorService
      .getTurmas()
      .subscribe((response) => {
        this.isLoading = false;
        this.turmas = response;
      });
  }

  getDetalhesProfessor() {
    this.ProfessorService
      .getProfessorDetalhes()
      .subscribe((response) => {
        console.log('Disciplinas', response);
        this.isLoading = false;
        this.disciplinas = response;
      });
  }

  addQuestoes() {
    this.questoes.push(this.formBuilder.group({
      enunciado: ['', Validators.required],
      pontos: ['', Validators.required],
      isMultiplaEscolha: [true, Validators.required],
      alternativas: this.formBuilder.array([]),
    }));
  }


  deleteQuestoes(index) {
    this.questoes.removeAt(index);
  }

  addAlternativa(control) {
    control.push(this.formBuilder.group({
      texto: ['', Validators.required],
      isResposta: [false, Validators.required]
    }));
  }


  deleteAlternativa(control, index) {
    control.removeAt(index);
  }

  private createForm() {

    this.form = this.formBuilder.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      tipo: ['', Validators.required],
      questoes: this.formBuilder.array([]),
      prazoInicial: ['', Validators.required],
      prazoFinal: ['', Validators.required],
      turmas: ['', Validators.required],
      disciplina: ['', Validators.required]

    });


  }

  createFormSimuladoTurma() {
    this.formSimuladoTurma = this.formBuilder.group({
      idSimulado: ['', Validators.required],
      turmas: ['', Validators.required],
      disciplina: ['', Validators.required]
    });
  }

  Adicionar() {
    this.isLoading = true;
    const result: simulado = Object.assign({}, this.form.value);
    this.ProfessorService
      .criarSimulado(result)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response) => {

        this.isLoading = false;

        if (response) {
          Swal.fire('Ok', 'Simulado adicionada com sucesso', 'success');
          this.router.navigateByUrl("/simulados");
        }
      });
  }

}

export class simulado {
  nome: string = '';
  descricao: string = '';
  titulo: string = '';
  questoes: any = [];
  prazoInicial: string = '';
  prazoFinal: string = '';
}