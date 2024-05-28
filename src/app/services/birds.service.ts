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

  public getAllBirds(): Observable<Birds[]> {
    return this.httpClient.get<Birds[]>(environment.apiBaseUrl + "v1/birds");
  }

  searchBirdsName(name: string): Observable<Birds[]> {
    const url = `${environment.apiBaseUrl}v1/birds?search=${name}`;
    console.log('Search URL:', url);
    return this.httpClient.get<Birds[]>(url);
  }

  public updateBirds(data: any): Observable<any> {
    return this.httpClient.post<any>(environment.apiBaseUrl + "{id}",  data);
  }

  public deleteBirds(dogsId: string): Observable<any> {
    const url = environment.apiBaseUrl + "{id}"
    return this.httpClient.request('delete', url, { body: { id: dogsId } });
  }
}
