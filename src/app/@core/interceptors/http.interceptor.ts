import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpClient,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap, map, retry, catchError, flatMap, switchMap } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";

import Swal from 'sweetalert2';


/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable({
  providedIn: "root",
})
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "application/json",
    //   }),
    // };
    // request = request.clone({
    //   headers: httpOptions.headers,
    // });

    if (!/^(http|https):/i.test(request.url)) {
      request = request.clone({
        url: environment.url + request.url,
      });
    }
    return next.handle(request).pipe(retry(1), catchError((error: HttpErrorResponse) => {

      let errorMessage = '';

      console.log(error);

      if (error.error) {

        // client-side error

        errorMessage = `Error: ${error.error.message}`;

      } else {

        // server-side error

        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

      }

      if (error.status === 401) {
        localStorage.removeItem("auth_app_token");
        this.router.navigate(["auth/login"]);
      }

      Swal.fire('Erro', errorMessage, 'error');


      return throwError(errorMessage);

    })

    )
  }
}
