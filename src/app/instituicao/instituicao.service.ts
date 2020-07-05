import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InstituicaoService {

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

  getSeries(): Observable<any> {
    return this.httpClient.get("/grupo-series").pipe(
      map((response: any) => {
        console.log("response", response);
        if (response) {
          return response;
        }
      })
    );
  }

  getCoordenadores(): Observable<any> {
    return this.httpClient.get("/instituicao/coordenador/listar").pipe(
      map((response: any) => {
        console.log("response", response);
        if (response) {
          return response;
        }
      })
    );
  }

  inserirAluno(dados: any): Observable<any> {
    return this.httpClient
      .post("/instituicao/aluno/salvar", dados)
      .pipe(
        map((response: any) => {
          console.log("response", response);
          if (response) {
            return response;
          }
        })
      );
  }
  editarAluno(dados: any): Observable<any> {
    return this.httpClient
      .put("/instituicao/aluno", dados)
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
      .post("/instituicao/professor/salvar", dados)
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
  editarDisciplina(dados: any): Observable<any> {
    return this.httpClient
      .put("/instituicao/disciplina", dados)
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

  getGrupos(): Observable<any> {
    return this.httpClient.get("/instituicao/gruposdeensino").pipe(
      map((response: any) => {
        console.log("response", response);
        if (response) {
          return response;
        }
      })
    );
  }
  inserirGrupo(dados: any): Observable<any> {
    return this.httpClient
      .post("/instituicao/gruposdeensino", dados)
      .pipe(
        map((response: any) => {
          console.log("response", response);
          if (response) {
            return response;
          }
        })
      );
  }
  editarGrupo(dados: any): Observable<any> {
    return this.httpClient
      .put("/instituicao/gruposdeensino", dados)
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
