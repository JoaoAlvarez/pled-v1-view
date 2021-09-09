import { disciplina } from './../../disciplinas/cadastrar/cadastrar.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstituicaoService } from "../../instituicao.service";
import { finalize } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'turmas-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})

export class TurmasEditarComponent implements OnInit {

  id: string;
  form!: FormGroup;
  isLoading: Boolean = true;
  disciplinas = [];
  turma;

  selectedDisciplina;
  selectedProfessorDisciplina;
  professores;
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private instituicaoService: InstituicaoService, protected router: Router,

  ) { }


  ngOnInit(): void {
    this.instituicaoService
    .getDisciplinas()
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        this.isLoading = false;
        this.disciplinas = response;
      });
    // this.getSeries();
    // this.getCoordenadores();
    // this.getGrupos();
    this.route.paramMap.subscribe((params: any) => {
      this.id = params.get('id');
      this.createForm();
    });
  }

  private createForm() {
    this.isLoading = true;
    this.instituicaoService
      .getTurmas()
      .pipe(finalize(() => { this.isLoading = false;}))
      .subscribe((response) => {
        this.isLoading = false;

        console.log('TURMAS', response);

        response.forEach(turmas => {
          turmas.series.forEach(serie => {
            let grupo = serie.grupo;
            let numSerie = serie.serie;
            serie.turmas.forEach(turma => {

              if (turma.id == this.id) {
                console.log('turma', turma);
                this.turma = turma;
                // this.form = this.formBuilder.group({
                //   nome: [turma.nome],
                //   grupo : [grupo],
                //   serie: [numSerie],
                //   coordenador: [turma.coordenador.id],
                // });
              }
            })
          })


        });
      });

    this.form = this.formBuilder.group({
      grupo: ['', Validators.required],
      serie: [1, Validators.required],
      nome: ['', Validators.required],
      turno: ['', Validators.required],
      coordenador: ['', Validators.required],
    });
  }

  inserirProfessor() {
    this.isLoading = true;
    this.instituicaoService
    .inserirProfessorNaTurma(this.id, this.selectedProfessorDisciplina)
    .pipe(finalize(() => { this.isLoading = false;}))
      .subscribe((response) => {
        console.log("response", response);
        this.createForm();
      });
  }

  filtrarProfessores(){
    this.isLoading = true;
    this.instituicaoService
    .getProfessoresPorDisciplina(this.selectedDisciplina)
    .pipe(finalize(() => { this.isLoading = false;}))
      .subscribe((response) => {
        console.log("response", response);
        this.professores = response;
      });
  }

  removerDisciplina(disciplina){
    console.log("remover", disciplina);
    this.isLoading = true;
    this.instituicaoService
    .removerProfessorNaTurma(this.id, disciplina.idProfessorDisciplina)
    .pipe(finalize(() => { this.isLoading = false;}))
      .subscribe((response) => {
        console.log("response", response);
        this.professores = response;
        this.createForm();
      });
  }

  /*submit() {

    console.log("response", this.form.value)

    this.isLoading = true;
    const result: turmas = Object.assign({}, this.form.value);
    this.InstituicaoService
      .inserirTurma(result)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response) => {

        this.isLoading = false;

        if (response) {
          Swal.fire('Ok', 'Turma adicionada com sucesso', 'success');
          this.router.navigateByUrl("/instituicao/turmas");

        }



      });

  }*/


}
