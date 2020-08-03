import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProfessorService } from "../../professor.service";
import { finalize } from 'rxjs/operators';
import { NbCalendarRange, NbDateService, } from '@nebular/theme';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


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

    // this.form.get("disciplinaProfessor").valueChanges.subscribe(selectedValue => {

    //   this.turmasFiltered = this.turmas.filter(
    //     turma => turma.disciplinas.some(disciplina => disciplina.idProfessorDisciplina == selectedValue
    //     ));
    // })

    // this.form.get("turma").valueChanges.subscribe(selectedValue => {
    //   this.getAulas();
    // })
  }

  filtrarTurma(disciplinaId) {
    console.log(disciplinaId)

    this.turmasFiltered = [];
    this.planos.clear();
    this.form.controls.turma.setValue('');
    //this.form.controls['planos'].setValue(this.formBuilder.array([]));

    this.turmasFiltered = this.turmas.filter(
      turma => turma.disciplinas.some(disciplina => disciplina.idProfessorDisciplina == disciplinaId
      ));
    console.log(this.form);


  }


  getAulas(disciplinaId, turmaId) {

    this.isLoading = true;

    this.ProfessorService
      .getPlanejamentos(disciplinaId, turmaId)
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        this.isLoading = false;

        if (response) {
          response.forEach(element => {
            this.addAula(element);
          });
        }
      });
  }

  onDrop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
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

  addAula(dados?) {
    if (!dados) {
      this.planos.push(this.formBuilder.group({
        titulo: ['', Validators.required],
        descricao: ['', Validators.required],
        dataInicio: ['', Validators.required],
        dataFim: ['', Validators.required],
      }));
    } else {
      this.planos.push(this.formBuilder.group({
        titulo: [dados.titulo, Validators.required],
        descricao: [dados.descricao, Validators.required],
        dataInicio: [dados.dataInicio, Validators.required],
        dataFim: [dados.dataFim, Validators.required],
      }));
    }
  }


  deleteAula(index) {
    this.planos.removeAt(index);
  }


  dateF(event) {
    console.log(event);
  }

  private createForm() {

    this.form = this.formBuilder.group({
      turma: ['', Validators.required],
      disciplinaProfessor: ['', Validators.required],
      planos: this.formBuilder.array([]),
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
          Swal.fire('Ok', 'Plano de aula adicionada com sucesso', 'success');
          //this.router.navigateByUrl("/professor/planejamento");
        }
      });
  }


}