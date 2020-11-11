import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TypeFetchResult } from 'src/app/selectType/models/typeFetchResult';

@Injectable({
  providedIn: 'root',
})
export class TypesService {
  baseUrl = 'https://pokeapi.co/api/v2';
  selectedTypes$: BehaviorSubject<Set<string>> = new BehaviorSubject<
    Set<string>
  >(new Set<string>());
  errorMessage$: Subject<string> = new Subject<string>();
  selectedTypes: Set<string> = new Set<string>();

  constructor(private http: HttpClient) {}

  fetchTypes(): Observable<TypeFetchResult> {
    return this.http.get<TypeFetchResult>(`${this.baseUrl}/type`);
  }

  selectTypes(type) {
    if (this.selectedTypes.size >= 2) {
      return;
    } else {
      this.selectedTypes.add(type);
      this.updateTypes(this.selectedTypes);
    }
  }

  removeType(type) {
    this.selectedTypes.delete(type);
    this.updateTypes(this.selectedTypes);
  }

  updateTypes(selectedTypes) {
    this.selectedTypes$.next(selectedTypes);
  }
}
