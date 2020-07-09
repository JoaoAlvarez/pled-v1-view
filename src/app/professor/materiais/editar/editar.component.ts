import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessorService } from "../../professor.service";
import { finalize } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'materiais-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})

export class MateriaisEditarComponent implements OnInit {

  form!: FormGroup;
  isLoading: Boolean = false;
  id: string;


  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private ProfessorService: ProfessorService, protected router: Router,

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.id = params.get('_id');
      this.createForm();
    });
  }


  private createForm() {
    var turma="5f021596c15ffea8d9fa4aba";
    var disciplina="5f021b3c211e99ae5eb85d01";
    var materialTurma = {turma,disciplina};
    const result: turma = Object.assign({}, materialTurma);
    this.ProfessorService
      .getMateriais(result)
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        this.isLoading = false;
        response.forEach(disciplinas => {
         // var t = this.router.url.split("/", 5);

          if (disciplinas._id == this.id) {
            this.form = this.formBuilder.group({
              nome: [disciplinas.nome],
              descricao: [disciplinas.descricao],
            });
          }
        });
      });
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
    });
  }

  submit() {
    this.isLoading = true;
    const result: material = Object.assign({}, this.form.value);
    this.ProfessorService
      .editarMateriais(result)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response) => {

        this.isLoading = false;

        if (response) {
          Swal.fire('Ok', 'Disciplina atualizada com sucesso', 'success');
          this.router.navigateByUrl("/professor/materiais/listar");
        }
      });
  }

}

export class material {
  nome: string = '';
  descricao: string = '';

}
export class turma {
  turma: string = '';
  disciplina: string = '';

}

