import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TypeFetchResult } from 'src/app/selectType/models/typeFetchResult';
import { Type } from 'src/app/shared/models/typeEffectiveness.model';

@Injectable({
  providedIn: 'root',
})
export class TypesService {
  baseUrl = 'https://pokeapi.co/api/v2';
  selectedTypes$: BehaviorSubject<Set<Type>> = new BehaviorSubject<Set<Type>>(
    new Set<Type>()
  );
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
