import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessorService } from "../../professor.service";
import { finalize } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'materiais-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})

export class MateriaisCadastrarComponent implements OnInit {

  form!: FormGroup;
  isLoading: Boolean = false;
  turmas = [];
  turmasFiltered = [];
  disciplinas = [];


  constructor(private formBuilder: FormBuilder, private ProfessorService: ProfessorService, protected router: Router,

  ) { }

  ngOnInit(): void {
    this.getTurmasProfessor();
    this.getDetalhesProfessor();
    this.createForm();
    this.form.get("disciplina").valueChanges.subscribe(selectedValue => {

      this.turmasFiltered = this.turmas.filter(
        turma => turma.disciplinas.some(disciplina => disciplina.idProfessorDisciplina == selectedValue
        ));

    })
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
  get material() {
    return this.form.get('material') as FormGroup;
  }

  private createForm() {
    // this.form = this.formBuilder.group({
    //   nome: ['', Validators.required],
    //   cnpj: ['', Validators.required],
    //   responsavel: ['', Validators.required],
    // });
    this.form = this.formBuilder.group({
      turma: ['', Validators.required],
      disciplina: ['', Validators.required],
      material: this.formBuilder.group({
        nome: ['', Validators.required],
        descricao: ['', Validators.required],
        url: ['', Validators.required],
      }),
      
    });
  }
  filterDisciplinas(event) {
    console.log(event);
  }

  submit() {
    this.isLoading = true;
    const result: material = Object.assign({}, this.form.value);
    this.ProfessorService
      .inserirMateriais(result)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response) => {

        this.isLoading = false;

        if (response) {
          Swal.fire('Ok', 'Disciplina adicionada com sucesso', 'success');
          this.router.navigateByUrl("/instituicao/disciplinas");
        }
      });
  }

}

export class material {
  turma:string = ''
  disciplina:string = ''
  material: any = [];
}

