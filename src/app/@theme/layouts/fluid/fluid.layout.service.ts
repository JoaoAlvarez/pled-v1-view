import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class FluidLayoutService {

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
        return this.httpClient.get("/aluno/turmas").pipe(
            map((response: any) => {
                if (response) {
                    return response;
                }
            })
        );
    }


}
