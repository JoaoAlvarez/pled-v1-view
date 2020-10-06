import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})

export class UsuariosService {
  constructor(private httpClient: HttpClient) { }


  getUsuarios(): Observable<any> {
    return this.httpClient.get("/admin/usuario/listar").pipe(
      map((response: any) => {
        console.log("response", response);
        if (response) {
          return response;
        }
      })
    );
  }

  resendValidation(id): Observable<any> {
    return this.httpClient.post("/admin/usuario/sendvalidationemail/" + id, null).pipe(
      map((response: any) => {

        if (response) {
          return response;
        }
      })
    );
  }

  deleteUser(dados): Observable<any> {

    let data = {
      'id': dados._id,
      'status': false
    }

    return this.httpClient.patch("/user/alterarstatus/", data).pipe(
      map((response: any) => {

        if (response) {
          return response;
        }
      })
    );
  }
}
