import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  getInfo(id: string): Observable<any> {
    return this.httpClient.get("/user/signup/" + id).pipe(
      map((response: any) => {
        console.log("response", response);
        if (response) {
          return response;
        }
      })
    );
  }

  signUp(dados: any): Observable<any> {
    return this.httpClient
      .post("/user/signup/validate", dados)
      .pipe(
        map((response: any) => {
          console.log("response", response);
          if (response) {
            return response;
          }
        })
      );
  }

  signIn(dados: any): Observable<any> {
    return this.httpClient
      .post("/user/signin", dados)
      .pipe(
        map((response: any) => {
          console.log("response", response);
          if (response) {
            return response;
          }
        })
      );
  }
}
