import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(private httpClient: HttpClient) { }

  getAlunoDetalhe(): Observable<any> {
    return this.httpClient.get("/aluno/detalhado").pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    );
  }

  getTurmas(): Observable<any> {
    return this.httpClient.get("/aluno/turmas/").pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    );
  }

  getDisciplinas(idTUrma): Observable<any> {
    return this.httpClient.get("/aluno/disciplinas/" + idTUrma).pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    );
  }

  getSimulados(idTurma): Observable<any> {
    return this.httpClient.get("/aluno/simulado/" + idTurma).pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    )
  }

  getTimeline(): Observable<any> {
    return this.httpClient.get("/timeline/usuario").pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    )
  }

  getAtividades(turmaId): Observable<any> {
    return this.httpClient.get("/timeline/simulados/" + turmaId).pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    )
  }
  getAulas(turmaId): Observable<any> {
    return this.httpClient.get("/timeline/aulas/" + turmaId).pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    )
  }
  getMateriais(turmaId): Observable<any> {
    return this.httpClient.get("/timeline/materiais/" + turmaId).pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    )
  }

  getTurmaDetalhe(turmaId): Observable<any> {
    return this.httpClient.get("/aluno/turma/id/" + turmaId).pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    );
  }

  getAtividade(idAtividade): Observable<any> {
    return this.httpClient.get("/aluno/simulado/id/" + idAtividade).pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    )
  }

  enviarRespostas(dados, atividadeId): Observable<any> {
    return this.httpClient.post("/aluno/simulado/executar/" + atividadeId, dados).pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    )
  }
}
