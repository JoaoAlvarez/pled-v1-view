import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class instituicoesService {
  constructor(private httpClient: HttpClient) { }

  getUserId(id): Observable<any> {
    return this.httpClient.get("/user/id/" + id).pipe(
      map((response: any) => {
        console.log("response", response);
        if (response) {
          return response;
        }
      })
    );
  }

  getInstituicoes(): Observable<any> {
    return this.httpClient.get("/admin/instituicao/listar").pipe(
      map((response: any) => {
        console.log("response", response);
        if (response) {
          return response;
        }
      })
    );
  }
  mudarStatus(dados: any): Observable<any> {
    return this.httpClient
      .post("/admin/instituicao/status", dados)
      .pipe(
        map((response: any) => {
          console.log("response", response);
          if (response) {
            return response;
          }
        })
      );
  }
  inserirInstituicao(dados: any): Observable<any> {
    return this.httpClient
      .post("/admin/instituicao/salvar", dados)
      .pipe(
        map((response: any) => {
          console.log("response", response);
          if (response) {
            return response;
          }
        })
      );
  }
  getTurmas(): Observable<any> {
    return this.httpClient.get("/professor/turma").pipe(
      map((response: any) => {
        console.log("response", response);
        if (response) {
          return response;
        }
      })
    );
  }
}
