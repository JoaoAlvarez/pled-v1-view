import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstituicaoService } from "../../instituicao.service";
import { finalize } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { instituicao } from '../../../admin/instituicoes/adicionar/adicionar.component';
import { isNgContainer } from '@angular/compiler';


@Component({
  selector: 'turmas-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})

export class TurmasEditarComponent implements OnInit {

  id: string;
  form!: FormGroup;
  isLoading: Boolean = true;
  options = [];
  series = [];
  grupos = [];
  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder, private InstituicaoService: InstituicaoService, protected router: Router,

  ) { }


  ngOnInit(): void {
    //this.getSeries();
    this.getCoordenadores();
    this.getGrupos();
    this.route.paramMap.subscribe((params: any) => {
      this.id = params.get('id');
      this.createForm();
    });
  }
  getGrupos() {
    this.InstituicaoService
      .getGrupos()
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        response.forEach(element => {
          this.grupos.push(element);
          
        });
      });
  }

  getSeries() {
    this.InstituicaoService
      .getSeries()
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        console.log(response);
        this.series = response;
      });
  }

  getCoordenadores() {
    this.InstituicaoService
      .getCoordenadores()
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        this.isLoading = false;
        console.log(response);
        this.options = response;

      });
  }

  private createForm() {
    this.InstituicaoService
      .getTurmas()
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        this.isLoading = false;
        console.log(response);
        response.forEach(turmas => {

          if (turmas.id == this.id) {
            this.form = this.formBuilder.group({
              grupo: [turmas.series.grupo],
              serie: [turmas.series.serie],
              nome: [turmas.series.turmas.nome],
              coordenador: [turmas.series.turmas.coordenador.nome],
            });
          }

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

  submit() {

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

  }


}
export class SelectShowcaseComponent {

}
export class turmas {
  grupo: string = '';
  serie: number = 1;
  nome: string = '';
  turno: string = '';
  coordenador: string = '';

}

