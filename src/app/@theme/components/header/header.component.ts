import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from "@nebular/theme";

import { LayoutService } from "../../../@core/utils";
import { map, takeUntil, tap, finalize } from "rxjs/operators";
import { Subject } from "rxjs";

import { NbAuthJWTToken, NbAuthService, NbAuthResult } from "@nebular/auth";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  loggedUser = {};

  themes = [
    {
      value: "default",
      name: "Light",
    },
    {
      value: "dark",
      name: "Dark",
    },
    {
      value: "cosmic",
      name: "Cosmic",
    },
    {
      value: "corporate",
      name: "Corporate",
    },
  ];

  currentTheme = "default";

  userMenu = [{ title: "Log out" }];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private authService: NbAuthService,
    protected router: Router,
  ) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {

      if (token.isValid()) {
        this.loggedUser = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
        this.user = this.loggedUser;
      }
    });

    this.authService.onAuthenticationChange().subscribe((response: any) => {
      console.log(response);
    });
  }

  ngOnInit() {


    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );


    this.menuService.onItemClick().subscribe((event) => {
      if (event.item.title === "Log out") {
        this.logout();
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.router.navigate(['/']);

    return false;
  }

  logout() {
    localStorage.removeItem("auth_app_token");
    localStorage.removeItem("turmaSelected");
    this.router.navigateByUrl("/auth/login");
  }

}
