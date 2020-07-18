import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstituicaoService } from "../../instituicao.service";
import { finalize } from 'rxjs/operators';
import { ColorEvent } from 'ngx-color';


import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'disciplinas-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})

export class DisciplinasEditarComponent implements OnInit {

  form!: FormGroup;
  isLoading: Boolean = true;
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
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      cor: ['', Validators.required]
    });

    this.InstituicaoService
      .getDisciplinas()
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        this.isLoading = false;
        response.forEach(disciplina => {
          // var t = this.router.url.split("/", 5);

          if (disciplina._id == this.id) {
            this.form = this.formBuilder.group({
              id: [disciplina._id],
              nome: [disciplina.nome],
              descricao: [disciplina.descricao],
              cor: [disciplina.cor]
            });


          }
        });
      });
  }


  colorChange($event: ColorEvent) {
    console.log($event);
    this.form.controls['cor'].setValue($event.color.hex);
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

