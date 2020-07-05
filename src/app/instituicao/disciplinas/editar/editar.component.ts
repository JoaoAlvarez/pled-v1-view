import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstituicaoService } from "../../instituicao.service";
import { finalize } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'disciplinas-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})

export class DisciplinasEditarComponent implements OnInit {

  form!: FormGroup;
  isLoading: Boolean = false;
  id: string;


  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private InstituicaoService: InstituicaoService, protected router: Router,

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.id = params.get('_id');
      this.createForm();
    });
  }


  private createForm() {
    this.InstituicaoService
      .getDisciplinas()
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
    const result: disciplina = Object.assign({}, this.form.value);
    this.InstituicaoService
      .editarDisciplina(result)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response) => {

        this.isLoading = false;

        if (response) {
          Swal.fire('Ok', 'Disciplina atualizada com sucesso', 'success');
          this.router.navigateByUrl("/instituicao/disciplinas/listar");
        }
      });
  }

}

export class disciplina {
  nome: string = '';
  descricao: string = '';

}

