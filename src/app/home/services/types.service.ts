import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeFetchResult } from 'src/app/home/models/typeFetchResult';

@Injectable({
  providedIn: 'root'
})
export class TypesService {
  baseUrl = 'https://pokeapi.co/api/v2';


  constructor(private http: HttpClient) { }

  fetchTypes(): Observable<TypeFetchResult> {
    return this.http.get<TypeFetchResult>(`${this.baseUrl}/type`);
  }
}
