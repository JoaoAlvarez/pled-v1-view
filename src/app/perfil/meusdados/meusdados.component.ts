import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { PerfilService } from '../perfil.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-meusdados',
  templateUrl: './meusdados.component.html',
  styleUrls: ['./meusdados.component.scss']
})
export class MeusdadosComponent implements OnInit {

  form!: FormGroup;
  isLoading: Boolean = false;

  constructor(private formBuilder: FormBuilder, private PerfilService: PerfilService, protected router: Router,

  ) { this.userDetails(); }

  ngOnInit(): void {

  }

  userDetails() {
    return this.PerfilService
      .getUserDetail()
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        this.createForm(response);

      });
  }


  createForm(res) {
    console.log(res);
    this.form = this.formBuilder.group({
      email: [res.email, Validators.required],
      cpf: [res.cpf, Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    this.isLoading = true;
    const result = Object.assign({}, this.form.value);
    this.PerfilService
      .atualizarSenha(result)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response) => {

        this.isLoading = false;

        if (response) {
          Swal.fire('Ok', 'Senha alterada com sucesso', 'success');
        }
      });
  }

}
