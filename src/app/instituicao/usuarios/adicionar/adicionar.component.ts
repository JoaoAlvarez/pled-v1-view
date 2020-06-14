import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray, FormControl } from '@angular/forms';
import { InstituicaoService } from "../../instituicao.service";
import { finalize } from 'rxjs/operators';
import { Product, SellingPoint } from './products';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'nb-select-clean',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.scss']
})

export class AdicionarComponent implements OnInit {

  form!: FormGroup;
  isLoading: Boolean = false;


  constructor(private formBuilder: FormBuilder, private InstituicaoService: InstituicaoService, protected router: Router,private fb: FormBuilder, private fb2: FormBuilder

  ) { }

  productForm: FormGroup;
  productForm2: FormGroup;

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: [],
      selling_points: this.fb.array([this.fb.group({point:''})])
    })
    this.productForm2 = this.fb.group({
      title: [],
      selling_points2: this.fb.array([this.fb.group({point:''})])
    })
    

    this.createForm();
  }

  get sellingPoints() {
    return this.productForm.get('selling_points') as FormArray;
  }
  get sellingPoints2() {
    return this.productForm2.get('selling_points2') as FormArray;
  }

  addSellingPoint() {
    this.sellingPoints.push(this.fb.group({point:''}));
  }
  addSellingPoint2() {
    this.sellingPoints2.push(this.fb.group({point:''}));
  }
  deleteSellingPoint(index) {
    this.sellingPoints.removeAt(index);
  }
  deleteSellingPoint2(index) {
    this.sellingPoints2.removeAt(index);
  }

  private createForm() {
    // this.form = this.formBuilder.group({
    //   nome: ['', Validators.required],
    //   cnpj: ['', Validators.required],
    //   responsavel: ['', Validators.required],
    // });
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      perfil: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      turmas: ['', Validators.required],
      disciplionas: ['', Validators.required],
    });
  }

  Adicionar() {
    this.isLoading = true;
    const result: usuario = Object.assign({}, this.form.value);
    this.InstituicaoService
      .inserirInstituicao(result)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response) => {

        this.isLoading = false;

        if (response) {
          Swal.fire('Ok', 'Usuário adicionada com sucesso', 'success');
          this.router.navigateByUrl("/instituicao/usuarios/professores");

        }



      });

  }


}

export class usuario {
  nome: string = ''
  cpf: string = ''
  email: string = '';
  perfil: string = '';
  turmas: string = '';
  disciplinas: string = '';

}

