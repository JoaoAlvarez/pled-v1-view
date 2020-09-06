import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { finalize, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbAuthService, NbTokenService } from '@nebular/auth';
import Swal from 'sweetalert2';


@Component({
  selector: 'ngx-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user: any = {};
  form!: FormGroup;
  erro = '';
  id = '';
  isLoading: Boolean = true;

  constructor(private route: ActivatedRoute, private authService: AuthService, private formBuilder: FormBuilder, private nbTokenService: NbTokenService, private router: Router) {
    this.route.paramMap.subscribe((params: any) => {
      this.id = params.get('id');
      this.getInfo(params.get('id'));
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem("auth_app_token")) {
      localStorage.removeItem("auth_app_token");
      this.router.navigate(["auth/signup/" + this.id]);
    }
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
        this.createForm(response, id);
        this.isLoading = false;
      }, (error) => {
        this.erro = error;
        this.isLoading = false;

      })
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
          console.log(response);
          const data = {
            email: result.email,
            password: result.password
          }

          Swal.fire('Ok', 'Cadastro realizado com sucesso', 'success');
          this.router.navigateByUrl("/auth/login?email=" + data.email);
          // this.authService.signIn(data).subscribe((response) => {
          //   //this.nbTokenService.set(response.token);
          // })

        }

      });

  }

}
