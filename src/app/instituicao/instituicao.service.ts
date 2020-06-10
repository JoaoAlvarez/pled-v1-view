import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InstituicaoService {

  constructor(private httpClient: HttpClient) { }

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
}
