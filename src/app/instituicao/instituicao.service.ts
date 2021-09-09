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
        if (response) {
          return response;
        }
      })
    );
  }

  getProfessorId(id): Observable<any> {
    return this.httpClient.get("/instituicao/professor/id/" + id).pipe(
      map((response: any) => {
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

  inserirAlunoNaTurma(dados: any): Observable<any> {

    let data = {
      'turmas': [dados.turma],
      'idAluno': dados.id
    }

    return this.httpClient
      .post("/instituicao/turma/aluno", data)
      .pipe(
        map((response: any) => {
          console.log("response", response);
          if (response) {
            return response;
          }
        })
      );
  }

  inserirProfessor(dados: any): Observable<any> {
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

  editarProfessor(dados: any): Observable<any> {
    return this.httpClient
      .put("/instituicao/professor", dados)
      .pipe(
        map((response: any) => {
          if (response) {
            return response;
          }
        })
      );
  }

  inserirProfessorDisciplina(professorId: string, disciplinaId:  string): Observable<any> {
    const dados = {
      idProfessor : professorId,
      idDisciplina : disciplinaId
    };

    return this.httpClient
      .post("/instituicao/professor/disciplina", dados)
      .pipe(
        map((response: any) => {
          if (response) {
            return response;
          }
        })
      );
  }

  deleteProfessorDisciplina(professorDisciplinaId: string): Observable<any> {
    return this.httpClient.delete("/instituicao/professor/disciplina/" + professorDisciplinaId).pipe(
      map((response: any) => {
        return response;
      })
    )
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

  inserirProfessorNaTurma(idTurma: string, idProfessorDisciplina : string) : Observable<any> {
    return this.httpClient
      .post("/instituicao/turma/professor", {idTurma , idProfessorDisciplina})
      .pipe(
        map((response: any) => {
          console.log("response", response);
          if (response) {
            return response;
          }
        })
      );
  }

  removerProfessorNaTurma(idTurma: string, idProfessorDisciplina : string) : Observable<any> {
    const body = {idTurma , idProfessorDisciplina};
    return this.httpClient
      .delete("/instituicao/turma/professor", { params: body})
      .pipe(
        map((response: any) => {
          console.log("response", response);
          if (response) {
            return response;
          }
        })
      );
  }

  getProfessoresPorDisciplina(idDisciplina): Observable<any> {
    return this.httpClient.get("/instituicao/professor/disciplina/"+ idDisciplina).pipe(
      map((response: any) => {
        console.log("response", response);
        if (response) {
          return response;
        }
      })
    );
  }

  deleteTurma(turmaId: string): Observable<any> {
    return this.httpClient.delete("/instituicao/turma/" + turmaId).pipe(
      map((response: any) => {
        return response;
      })
    )
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
  deleteGrupo(dados: any): Observable<any> {
    console.log(dados)
    return this.httpClient
      .delete("/instituicao/gruposdeensino", dados)
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
