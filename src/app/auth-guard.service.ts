import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { NbAuthService, NbAuthJWTToken } from "@nebular/auth";
import { tap } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
  user: any = {};

  constructor(private authService: NbAuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
      }
    });

    if (this.user && this.user > 0) {
      if (route.data.roles && route.data.roles.indexOf(this.user.user.perfil) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }

    return this.authService.isAuthenticated().pipe(
      tap((authenticated) => {
        if (!authenticated) {
          localStorage.removeItem("auth_app_token");
          this.router.navigate(["auth/login"]);
        }
      })
    );
  }
}
