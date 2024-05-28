import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environments";
import {Cats} from "../models/cats";

@Injectable({
  providedIn: 'root'
})
export class CatsService {
  constructor(private httpClient: HttpClient) {
  }

  public getAllCats(): Observable<Cats[]> {
    return this.httpClient.get<Cats[]>(environment.apiBaseUrl + "v1/cats");
  }

  searchCatsName(name: string): Observable<Cats[]> {
    const url = `${environment.apiBaseUrl}v1/cats?search=${name}`;
    console.log('Search URL:', url);
    return this.httpClient.get<Cats[]>(url);
  }

  public updateCats(data: any): Observable<any> {
    return this.httpClient.post<any>(environment.apiBaseUrl + "{id}",  data);
  }

  public deleteCats(catsId: string): Observable<any> {
    const url = environment.apiBaseUrl + "{id}"
    return this.httpClient.request('delete', url, { body: { id: catsId } });
  }
}
