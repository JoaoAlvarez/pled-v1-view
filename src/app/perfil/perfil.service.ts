import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private httpClient: HttpClient) { }

  getUserDetail(): Observable<any> {
    return this.httpClient.get("/user/detail").pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    );
  }
  atualizarUsuario(data): Observable<any> {
    return this.httpClient.put("/user/atualizar", data).pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    );
  }
  atualizarSenha(data): Observable<any> {
    return this.httpClient.put("/user/updatepassword", data).pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    );
  }
}
