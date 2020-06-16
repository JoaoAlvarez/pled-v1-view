import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: any;
  loggedUser: any = {};

  constructor(protected router: Router, private authService: NbAuthService,
  ) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {

      if (token.isValid()) {
        this.loggedUser = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
        this.user = this.loggedUser.user;
      }
    });
  }

  ngOnInit(): void {
    if (this.user) {
      if (this.user.perfil == 'Administrador') {
        this.router.navigateByUrl('/admin');
      }
      if (this.user.perfil == 'Instituição') {
        this.router.navigateByUrl('/instituicao');
      }
      if (this.user.perfil == 'Professor') {
        this.router.navigateByUrl('/professor');
      }
    } else {
      localStorage.removeItem("auth_app_token");
      this.router.navigateByUrl('/auth/login');
    }
  }

}
