import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Dogs} from "../models/dogs";
import {environment} from "../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class DogsService {

  constructor(private httpClient: HttpClient) {
  }

  public getAllDogs(): Observable<Dogs[]> {
    return this.httpClient.get<Dogs[]>(environment.apiBaseUrl + "v1/dogs");
  }

  searchDogsName(name: string): Observable<Dogs[]> {
    const url = `${environment.apiBaseUrl}v1/dogs?search=${name}`;
    console.log('Search URL:', url);
    return this.httpClient.get<Dogs[]>(url);
  }

  public updateDogs(data: any): Observable<any> {
    return this.httpClient.post<any>(environment.apiBaseUrl + "{id}",  data);
  }

  public deleteDogs(dogsId: string): Observable<any> {
    const url = environment.apiBaseUrl + "{id}"
    return this.httpClient.request('delete', url, { body: { id: dogsId } });
  }
}
