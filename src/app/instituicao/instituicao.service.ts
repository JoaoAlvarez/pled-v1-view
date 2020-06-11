import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InstituicaoService {

  constructor(private httpClient: HttpClient) { }

  getAlunos(): Observable<any> {
    return this.httpClient.get("/instituicao/aluno/listar").pipe(
      map((response: any) => {
        console.log("response", response);
        if (response) {
          return response;
        }
      })
    );
  }
  getProfessores(): Observable<any> {
    return this.httpClient.get("/instituicao/professor/listar").pipe(
      map((response: any) => {
        console.log("response", response);
        if (response) {
          return response;
        }
      })
    );
  }
  getCoordenadores(): Observable<any> {
    return this.httpClient.get("/instituicao/coodenador/listar").pipe(
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
      .post("/instituicao/usuario/salvar", dados)
      .pipe(
        map((response: any) => {
          console.log("response", response);
          if (response) {
            return response;
          }
        })
      );
  }

  inserirTurma(dados: any): Observable<any> {
    return this.httpClient
      .post("/instituicao/turma/salvar", dados)
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
    return this.httpClient.get("/instituicao/turma/listar").pipe(
      map((response: any) => {
        console.log("response", response);
        if (response) {
          return response;
        }
      })
    );
  }

  inserirDisciplina(dados: any): Observable<any> {
    return this.httpClient
      .post("/instituicao/disciplina/salvar", dados)
      .pipe(
        map((response: any) => {
          console.log("response", response);
          if (response) {
            return response;
          }
        })
      );
  }


  getDisciplinas(): Observable<any> {
    return this.httpClient.get("/instituicao/disciplina/listar").pipe(
      map((response: any) => {
        console.log("response", response);
        if (response) {
          return response;
        }
      })
    );
  }
}
