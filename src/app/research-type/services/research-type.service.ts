import { Injectable } from '@angular/core';
import { Type, types } from 'src/app/shared/typeEffectiveness';

@Injectable({
  providedIn: 'root',
})
export class ResearchTypeService {
  constructor() {}

  searchType(selectedTypes: Set<Type>) {
    let result = [];
    switch (selectedTypes.size) {
      case 0:
        return alert('error');
      case 1:
        for (let type of types) {
          console.log(type.type === selectedTypes[0].type);
          if (type.type === selectedTypes[0].type) {
            let index = type.damageTaken.indexOf(2);
            while (index != -1) {
              result.push({ type: types[index].type, damage: 2 });
              index = type.damageTaken.indexOf(2, index + 1);
            }
          }
        }
        return alert(result);
    }
  }
}
