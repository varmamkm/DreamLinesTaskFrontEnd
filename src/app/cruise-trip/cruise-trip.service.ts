import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { KeyValuePair, CruiseTrip } from './cruise-trip-model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class CruiseService {
  apipath = 'http://localhost:12385/api/cruise/'; 

  constructor(
    private http: HttpClient,) {
    }

  getCruiseLines (): Observable<KeyValuePair[]> {
    return this.http.get<KeyValuePair[]>(this.apipath+"getcruiselines");
  }

  getShips (companyid): Observable<KeyValuePair[]> {
    return this.http.get<KeyValuePair[]>(this.apipath+"getships/"+companyid);
  }

  getCabinCategory (shipid): Observable<KeyValuePair[]> {
    return this.http.get<KeyValuePair[]>(this.apipath+"getcabincategory/"+shipid);
  }

  getPorts (): Observable<KeyValuePair[]> {
    return this.http.get<KeyValuePair[]>(this.apipath+"getports");
  }

  createCruiseTrip (trip: CruiseTrip): Observable<CruiseTrip> {
    return this.http.post<CruiseTrip>(this.apipath+"createtrip", trip);
  }
}
