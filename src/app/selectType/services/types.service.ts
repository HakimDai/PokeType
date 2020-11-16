import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TypeFetchResult } from 'src/app/selectType/models/typeFetchResult';
import { Type } from 'src/app/shared/typeEffectiveness';

@Injectable({
  providedIn: 'root',
})
export class TypesService {
  baseUrl = 'https://pokeapi.co/api/v2';
  selectedTypes$: BehaviorSubject<Set<Type>> = new BehaviorSubject<Set<Type>>(
    new Set<Type>()
  );
  errorMessage$: Subject<string> = new Subject<string>();
  selectedTypes: Set<Type> = new Set<Type>();

  constructor(private http: HttpClient) {}

  fetchTypes(): Observable<TypeFetchResult> {
    return this.http.get<TypeFetchResult>(`${this.baseUrl}/type`);
  }

  selectTypes(type) {
    if (this.selectedTypes.size >= 2) {
      return;
    } else {
      type.isSelected = true;
      this.selectedTypes.add(type);
      this.updateTypes(this.selectedTypes);
    }
  }

  removeType(type) {
    type.isSelected = false;
    this.selectedTypes.delete(type);
    this.updateTypes(this.selectedTypes);
  }

  updateTypes(selectedTypes) {
    this.selectedTypes$.next(selectedTypes);
  }
}
