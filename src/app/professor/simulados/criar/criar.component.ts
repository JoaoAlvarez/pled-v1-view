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
  styleUrls: ['./criar.component.scss'],

})

export class CriarComponent implements OnInit {

  form!: FormGroup;
  isLoading: Boolean = false;
  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private ProfessorService: ProfessorService, protected router: Router,) 
  {

  }

  ngOnInit(): void {
    this.createForm();
  }

  get questoes() {
    return this.form.get('questoes') as FormArray;
  }

  addQuestoes() {
    this.questoes.push(this.formBuilder.group({
      turma: ['', Validators.required],
      disciplina: ['', Validators.required]
    }));
  }

  deleteQuestoes(index) {
    this.questoes.removeAt(index);
  }

  private createForm() {
    // this.form = this.formBuilder.group({
    //   nome: ['', Validators.required],
    //   cnpj: ['', Validators.required],
    //   responsavel: ['', Validators.required],
    // });
    this.form = this.formBuilder.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      tipo: ['', Validators.required],
      questoes: this.formBuilder.array([this.formBuilder.group({
        enunciado: ['', Validators.required],
        pontos: ['', Validators.required],
        isMultiplaEscolha: ['', Validators.required],
        alternativas: this.formBuilder.array([this.formBuilder.group({
          texto: ['', Validators.required],
          isResposta: ['', Validators.required],
          resposta1: ['', Validators.required],
          resposta2: ['', Validators.required],
          resposta3: ['', Validators.required],
          resposta4: ['', Validators.required],
          resposta5: ['', Validators.required],
        })])
      })]),
      prazoInicial : ['', Validators.required],
      prazoFinal : ['', Validators.required],
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
/*
export class CalendarShowcaseComponent {
  date = new Date();
}*/
export class CalendarRangeShowcaseComponent {
  range: NbCalendarRange<Date>;

  constructor(protected dateService: NbDateService<Date>) {
    this.range = {
      start: this.dateService.addDay(this.monthStart, 3),
      end: this.dateService.addDay(this.monthEnd, -3),
    };
  }

  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }

  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }
}

