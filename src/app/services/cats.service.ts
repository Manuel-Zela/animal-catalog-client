import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environments";
import {Cats} from "../models/cats";
import {Dogs} from "../models/dogs";

@Injectable({
  providedIn: 'root'
})
export class CatsService {
  constructor(private httpClient: HttpClient) {
  }

  public getAllCats(data: any): Observable<Cats[]> {
    return this.httpClient.get<Cats[]>(environment.apiBaseUrl + "/cats");
  }

  public updateCats(data: FormData): Observable<any> {
    return this.httpClient.post<any>(environment.apiBaseUrl + "/cats/update",  data);
  }

  public deleteCats(catsId: string ): Observable<any> {
    const url = environment.apiBaseUrl + "/cats/delete"
    return this.httpClient.request('delete', url, { body: { id: catsId } });
  }

  searchCatsName(name: string): Observable<Cats[]> {
    const url = `${environment.apiBaseUrl}/cats/search/${name}`;
    console.log('Search URL:', url);
    return this.httpClient.get<Cats[]>(url);
  }

  public getCatsLimit() :Observable<Cats[]> {
    return this.httpClient.get<Cats[]>(environment.apiBaseUrl + "/cats/limit?limit=4");}
}
