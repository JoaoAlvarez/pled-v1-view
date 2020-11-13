import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: "ngx-recoverpassword",
  styleUrls: ["./recover.component.scss"],
  templateUrl: "./recover.component.html",
})
export class RecoverPasswordComponent implements OnInit {

  form!: FormGroup;
  isLoading = false;


  constructor(private route: ActivatedRoute, private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.createForm();
  }


  private createForm() {

    this.form = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  submit() {
    this.isLoading = true;
    const result = Object.assign({}, this.form.value);
    this.authService
      .recoverPassowrd(result)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response) => {

        this.isLoading = false;

        if (response) {
          console.log(response);
          const data = {
            email: result.email,
          }

          Swal.fire('Ok', 'Solicitação de recuperação de senha realizado com sucesso', 'success');


        }

      });

  }


}
