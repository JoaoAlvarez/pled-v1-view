import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { finalize } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'ngx-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user: any = {};
  form!: FormGroup;
  isLoading: Boolean = false;

  constructor(private route: ActivatedRoute, private authService: AuthService, private formBuilder: FormBuilder) {
    this.route.paramMap.subscribe((params: any) => {
      this.getInfo(params.get('id'));
    });

  }

  ngOnInit(): void {
  }

  private createForm(data, token) {

    this.form = this.formBuilder.group({
      id: [data._id, Validators.required],
      nome: [data.nome, Validators.required],
      email: [data.email, Validators.required],
      token: [token, Validators.required],
      cpf: [data.cpf, Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });
  }

  getInfo(id: string) {
    this.isLoading = true;
    this.authService
      .getInfo(id)
      .pipe(finalize(() => { }))
      .subscribe((response) => {
        console.log(response);
        this.createForm(response, id);
        this.isLoading = false;
      });
  }

  getConfigValue(key: string): any {
    return false;
  }

  submit() {
    this.isLoading = true;
    const result = Object.assign({}, this.form.value);
    this.authService
      .signUp(result)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response) => {

        this.isLoading = false;

        if (response) {
          //Swal.fire('Ok', 'Escola adicionada com sucesso', 'success');
          //this.router.navigateByUrl("/instituicoes/listar");
          console.log(response);

        }



      });

  }

}
