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
export class DogsService {

  constructor(private httpClient: HttpClient) { }

  public getDogs() :Observable<Dogs[]> {
    return this.httpClient.get<Dogs[]>(environment.apiBaseUrl + "v1/dogs") ;}

  public getCats() :Observable<Cats[]> {
    return this.httpClient.get<Cats[]>(environment.apiBaseUrl + "v1/cats");}

  public getBirds() :Observable<Birds[]> {
    return this.httpClient.get<Birds[]>(environment.apiBaseUrl + "v1/birds");}
}
