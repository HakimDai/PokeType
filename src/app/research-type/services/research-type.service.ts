import { Injectable } from '@angular/core';
import { Type, types } from 'src/app/shared/typeEffectiveness';
import { BehaviorSubject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DisplayBestTypesDialogComponent } from 'src/app/research-type/components/display-best-types-dialog/display-best-types-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ResearchTypeService {
  result: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(undefined);
  constructor(public bestTypeDialog: MatDialog) {}

  searchType(selectedTypes: Set<Type>) {
    let bestDamageTypes: string[] = [];
    let filteredBestDamageTypes: { type; value }[] = [];
    switch (selectedTypes.size) {
      case 0:
        return alert('error');
      case 1:
        bestDamageTypes = this.findBestDamageTypes(selectedTypes);
        this.bestTypeDialog.open(DisplayBestTypesDialogComponent, {
          data: bestDamageTypes,
        });
        return this.result.next(bestDamageTypes);
      case 2:
        bestDamageTypes = this.findBestDamageTypes(selectedTypes);
        bestDamageTypes.forEach((result) => {
          filteredBestDamageTypes.push({
            type: result,
            value: bestDamageTypes.reduce(
              (a, res) => (res === result ? a + 1 : a),
              0
            ),
          });
        });
        const res: string[] = filteredBestDamageTypes
          .sort((a, b) => b.value - a.value)
          .map((result) => Object.values(result)[0]);
        this.bestTypeDialog.open(DisplayBestTypesDialogComponent, {
          data: res,
        });
        return this.result.next(res);
    }
  }

  findBestDamageTypes(selectedTypes) {
    let bestDamageTypes: string[] = [];
    for (let type of types) {
      if (selectedTypes.has(type)) {
        let index = type.damageTaken.indexOf(2);
        while (index != -1) {
          bestDamageTypes.push(types[index].type);
          index = type.damageTaken.indexOf(2, index + 1);
        }
      }
    }
    return bestDamageTypes;
  }
}
