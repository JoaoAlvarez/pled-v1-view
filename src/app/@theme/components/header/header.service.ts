import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class HeaderService {
  constructor(private httpClient: HttpClient) {}

  getParticipante(): Observable<string> {
    return this.httpClient
      .get("http://gavea-users.nonprod.azure.pitang.com/api/Participant")
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
