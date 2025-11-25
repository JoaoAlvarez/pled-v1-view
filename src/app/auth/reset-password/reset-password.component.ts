import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize } from "rxjs/operators";
import Swal from "sweetalert2";
import { AuthService } from "../auth.service";

@Component({
  selector: "ngx-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;
  erro: string | null = null;
  private token: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get("token");
    if (!this.token) {
      this.erro = "Token de recuperação inválido.";
      return;
    }
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(group: FormGroup): null | object {
    const password = group.get("password")?.value;
    const confirmPassword = group.get("confirmPassword")?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  submit(): void {
    if (!this.form.valid || !this.token) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const payload = {
      token: this.token,
      password: this.form.value.password,
    };

    this.authService.resetPassword(payload)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe({
        next: () => {
          Swal.fire("Senha atualizada!", "Sua nova senha foi registrada com sucesso.", "success");
          this.router.navigate(["../login"], { relativeTo: this.route.parent });
        },
        error: (error) => {
          this.erro = error?.error?.message || "Não foi possível atualizar a senha.";
        }
      });
  }

  showPasswordMismatch(): boolean {
    return !!(this.form?.errors?.passwordMismatch && this.form.get("confirmPassword")?.touched);
  }
}
