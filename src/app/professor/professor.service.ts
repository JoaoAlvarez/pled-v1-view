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

  get professorDetalhe() {
    return JSON.parse(localStorage.getItem('professor'));
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
    console.log(data);

    let send;
    let url;
    let params;

    if (data.tipo_material == 'arquivo') {

      send = new FormData();
      send.append('file', data.fileSource);
      send.append('dados', JSON.stringify(data));
      url = '/professor/turma/material/arquivo';


      // params = {
      //   headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
      // }


    } else if (data.tipo_material == 'url') {

      url = '/professor/turma/material/url';
      send = data;

      delete send.file;
    }

    console.log('SEND', send);

    return this.httpClient.post(url, send, params).pipe(
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

  deletarMaterial(id): Observable<any> {
    return this.httpClient.delete("/professor/turma/material/" + id).pipe(
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

  getTimelineAtividades(turmaId): Observable<any> {
    return this.httpClient.get("/timeline/simulados/" + turmaId).pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    )
  }

  getTimelineAulas(turmaId): Observable<any> {
    return this.httpClient.get("/timeline/aulas/" + turmaId).pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    )
  }

  getTimelineMateriais(turmaId): Observable<any> {
    return this.httpClient.get("/timeline/materiais/" + turmaId).pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    )
  }

  getTurmaDetalhe(turmaId): Observable<any> {
    return this.httpClient.get("/professor/turma/id/" + turmaId).pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    );
  }

  getAtividade(idAtividade): Observable<any> {
    return this.httpClient.get("/professor/simulado/id/" + idAtividade).pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    )
  }

  getRespostasAlunos(idAtividade): Observable<any> {
    return this.httpClient.get("/professor/simulado/poraluno/idsimulado/" + idAtividade).pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    )
  }


  enviarRespostas(idSimulado, respostas): Observable<any> {
    return this.httpClient.put("/professor/simulado/corrigir/" + idSimulado, respostas).pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    );
  }

}
