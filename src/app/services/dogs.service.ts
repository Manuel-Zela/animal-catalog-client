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

  public getAllDogs(data: any): Observable<Dogs[]> {
    return this.httpClient.get<Dogs[]>(environment.apiBaseUrl + "/dog");
  }

  public updateDogs(data: FormData): Observable<any> {
    return this.httpClient.post<any>(environment.apiBaseUrl + "/dog/update",  data);
  }

  public deleteDogs(dogsId: string ): Observable<any> {
    const url = environment.apiBaseUrl + "/dog/delete"
    return this.httpClient.request('delete', url, { body: { id: dogsId } });
  }

  searchDogsName(name: string): Observable<Dogs[]> {
    const url = `${environment.apiBaseUrl}/dog/search/${name}`;
    console.log('Search URL:', url);
    return this.httpClient.get<Dogs[]>(url);
  }

  public getDogsLimit() :Observable<Dogs[]> {
    return this.httpClient.get<Dogs[]>(environment.apiBaseUrl + "/dog/limit?limit=4");}


}
