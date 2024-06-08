import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environments";
import {Birds} from "../models/birds";

@Injectable({
  providedIn: 'root'
})
export class BirdsService {

  constructor(private httpClient: HttpClient) {
  }

  public getAllBirds(data: any): Observable<Birds[]> {
    return this.httpClient.get<Birds[]>(environment.apiBaseUrl + "/birds");
  }

  public updateBirds(data: FormData): Observable<any> {
    return this.httpClient.post<any>(environment.apiBaseUrl + "/birds/update",  data);
  }

  public deleteBirds(birdId: string ): Observable<any> {
    const url = environment.apiBaseUrl + "/birds/delete"
    return this.httpClient.request('delete', url, { body: { id: birdId } });
  }

  searchBirdsName(name: string): Observable<Birds[]> {
    const url = `${environment.apiBaseUrl}/birds/search/${name}`;
    console.log('Search URL:', url);
    return this.httpClient.get<Birds[]>(url);
  }


  public getBirdsLimit() :Observable<Birds[]> {
    return this.httpClient.get<Birds[]>(environment.apiBaseUrl + "/birds/limit?limit=4");}
}
