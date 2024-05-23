import { Injectable } from '@angular/core';
import {Dogs} from "../models/dogs";
import {Observable} from "rxjs";
import {environment} from "../../environments/environments";
import {HttpClient} from "@angular/common/http";
import {Cats} from "../models/cats";
import {Birds} from "../models/birds";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private httpClient: HttpClient) { }

  public getDogs() :Observable<Dogs[]> {
    return this.httpClient.get<Dogs[]>(environment.apiBaseUrl + "v1/dogs") ;}

  public getCats() :Observable<Cats[]> {
    return this.httpClient.get<Cats[]>(environment.apiBaseUrl + "v1/cats");}

  public getBirds() :Observable<Birds[]> {
    return this.httpClient.get<Birds[]>(environment.apiBaseUrl + "v1/birds");}

  searchDogsName(name: string): Observable<Dogs[]> {
    const url = `${environment.apiBaseUrl}v1/dogs?search=${name}`;
    console.log('Search URL:', url);
    return this.httpClient.get<Dogs[]>(url);
  }

  searchCatsName(name: string): Observable<Cats[]> {
    const url = `${environment.apiBaseUrl}v1/cats?search=${name}`;
    console.log('Search URL:', url);
    return this.httpClient.get<Cats[]>(url);
  }


  searchBirdsName(name: string): Observable<Birds[]> {
    const url = `${environment.apiBaseUrl}v1/birds?search=${name}`;
    console.log('Search URL:', url);
    return this.httpClient.get<Birds[]>(url);
  }


  public get1Dogs() :Observable<Dogs[]> {
    return this.httpClient.get<Dogs[]>(environment.apiBaseUrl + "v1/dogs?limit=1");}


  public get1Cats() :Observable<Cats[]> {
    return this.httpClient.get<Cats[]>(environment.apiBaseUrl + "v1/cats?limit=1");}

  public get1Birds() :Observable<Birds[]> {
    return this.httpClient.get<Birds[]>(environment.apiBaseUrl + "v1/birds?limit=1");}

}
