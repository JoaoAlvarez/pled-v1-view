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
  file: string;
  fileBase64: any;


  constructor(private formBuilder: FormBuilder, private ProfessorService: ProfessorService, protected router: Router,

  ) { }

  ngOnInit(): void {
    this.getTurmasProfessor();
    this.getDetalhesProfessor();
    this.createForm();
    this.form.get("disciplinas").valueChanges.subscribe(selectedValue => {

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

  fileChange(event: any) {
    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   this.file = file;
    //   this.form.patchValue({
    //     fileSource: file
    //   });
    // }

    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      fileSource: file
    });
    //this.form.get('fileSouce').updateValueAndValidity()
  }

  private createForm() {

    this.form = this.formBuilder.group({
      turma: ['', Validators.required],
      disciplinas: ['', Validators.required],
      tipo_material: ['', Validators.required],
      file: [''],
      fileSource: [''],
      material: this.formBuilder.group({
        nome: ['', Validators.required],
        descricao: ['', Validators.required],
        url: [''],
      }),

    });
  }


  submit() {
    this.isLoading = true;
    const result = Object.assign({}, this.form.value);


    this.ProfessorService
      .inserirMateriais(result)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response) => {

        this.isLoading = false;

        if (response) {
          Swal.fire('Ok', 'Material adicionado com sucesso', 'success');
          this.router.navigateByUrl("/professor/materiais");
        }
      });
  }

  setRequired() {
    return [Validators.required];
  }

  changeTipo(event: any) {
    if (event === 'arquivo') {
      this.form.controls.file.setValidators(this.setRequired());
      this.form.controls.file.setValue('');
      this.material.controls.url.clearValidators();
      this.material.controls.url.setValue('');


    } else {
      this.material.controls.url.setValidators(this.setRequired());
      this.material.controls.url.setValue('');
      this.form.controls.file.clearValidators();
      this.form.controls.file.setValue('');

    }

    this.form.updateValueAndValidity();
  }

}



