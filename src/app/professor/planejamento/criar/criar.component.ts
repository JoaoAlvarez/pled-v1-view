import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProfessorService } from "../../professor.service";
import { finalize } from 'rxjs/operators';
import { NbCalendarRange, NbDateService, } from '@nebular/theme';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-criar',
  templateUrl: './criar.component.html',
  styleUrls: ['./criar.component.scss']
})
export class CriarComponent implements OnInit {

  form!: FormGroup;
  isLoading: Boolean = true;
  turmas = [];
  turmasFiltered = [];
  disciplinas = [];

  constructor(private formBuilder: FormBuilder, private ProfessorService: ProfessorService, protected router: Router) {

  }

  ngOnInit(): void {
    this.getTurmasProfessor();
    this.getDetalhesProfessor();
    this.createForm();

    this.form.get("disciplinaProfessor").valueChanges.subscribe(selectedValue => {

      this.turmasFiltered = this.turmas.filter(
        turma => turma.disciplinas.some(disciplina => disciplina.idProfessorDisciplina == selectedValue
        ));

    })
  }

  get planos() {
    return this.form.get('planos') as FormArray;
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
        this.isLoading = false;
        this.disciplinas = response.disciplinas;
      });
  }

  addAula() {
    this.planos.push(this.formBuilder.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
    }));
  }


  deleteAula(index) {
    this.planos.removeAt(index);
  }


  filterDisciplinas(event) {
    console.log(event);
  }

  private createForm() {

    this.form = this.formBuilder.group({
      turmas: ['', Validators.required],
      disciplinaProfessor: ['', Validators.required],
      planos: this.formBuilder.array([this.formBuilder.group({
        titulo: ['', Validators.required],
        descricao: ['', Validators.required],
        dataInicio: ['', Validators.required],
        dataFim: ['', Validators.required],
      })]),
    });

  }



  Adicionar() {
    this.isLoading = true;
    const result = Object.assign({}, this.form.value);
    this.ProfessorService
      .criarPlanejamento(result)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response) => {

        this.isLoading = false;

        if (response) {

        }
      });
  }


}