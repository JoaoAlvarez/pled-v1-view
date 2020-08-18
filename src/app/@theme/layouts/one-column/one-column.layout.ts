import { Component, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService, NbAuthResult } from "@nebular/auth";
import { Router } from "@angular/router";


@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>


      <nb-layout-header class="header-title" subheader *ngIf="loggedUser.user.perfil != 'Administrador'">
          <ng-content select="[sub-header]"></ng-content>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive state="compacted">
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column>

        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent implements OnInit {

  loggedUser = {};
  user: any;


  constructor(
    private authService: NbAuthService,
    protected router: Router,
  ) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {

      if (token.isValid()) {
        this.loggedUser = token.getPayload();
        console.log(this.loggedUser);
      }
    });

  }


  ngOnInit(): void {
    //this.getAlunoDetalhe();
  }

}
