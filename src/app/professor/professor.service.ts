import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(private httpClient: HttpClient) { }

  getSimulados(): Observable<any> {
    return this.httpClient.get("/professor/simulado/listar").pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    );
  }
  criarSimulado(dados: any): Observable<any> {
    return this.httpClient
      .post("/professor/simulado/novo", dados)
      .pipe(
        map((response: any) => {
          if (response) {
            return response;
          }
        })
      );
  }
  getTurmas(): Observable<any> {
    return this.httpClient.get("/professor/turma").pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    );
  }
  getProfessorDetalhes(): Observable<any> {
    return this.httpClient.get("/professor/detalhado").pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    );
  }

  inserirSimuladoTurma(data): Observable<any> {
    return this.httpClient.post("/professor/simulado/turma", data).pipe(
      map((response: any) => {
        return response;
      })
    )
  }
  getMateriais(disciplinaId, turmaId): Observable<any> {
    let dados = {
      'turma': turmaId,
      'disciplina': disciplinaId
    }

    return this.httpClient.put("/professor/turma/material/listar", dados).pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    );
  }
  inserirMateriais(data): Observable<any> {
    return this.httpClient.post("/professor/turma/material", data).pipe(
      map((response: any) => {
        return response;
      })
    )
  }
  editarMateriais(data): Observable<any> {
    return this.httpClient.put("/professor/turma/material", data).pipe(
      map((response: any) => {
        return response;
      })
    )
  }

  criarPlanejamento(dados: any): Observable<any> {
    return this.httpClient
      .post("/professor/turma/planodeaula", dados)
      .pipe(
        map((response: any) => {
          if (response) {
            return response;
          }
        })
      );
  }

  getPlanejamentos(disciplinaId, turmaId): Observable<any> {
    let dados = {
      'turmaId': turmaId,
      'disciplinaProfessor': disciplinaId
    }

    return this.httpClient.put("/professor/turma/planodeaula/listar", dados).pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    );
  }

}
