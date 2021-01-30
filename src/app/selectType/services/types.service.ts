import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Type } from 'src/app/shared/models/typeEffectiveness.model';

@Injectable({
  providedIn: 'root',
})
export class TypesService {
  selectedTypes$: BehaviorSubject<Set<Type>> = new BehaviorSubject<Set<Type>>(
    new Set<Type>()
  );
  selectedTypes: Set<Type> = new Set<Type>();

  constructor() {}

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
