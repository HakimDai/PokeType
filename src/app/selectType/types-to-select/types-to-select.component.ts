import { Component, OnDestroy, OnInit } from '@angular/core';
import { types } from 'src/app/shared/typeEffectiveness';
import { TypesService } from 'src/app/selectType/services/types.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-types-to-select',
  templateUrl: './types-to-select.component.html',
  styleUrls: ['./types-to-select.component.scss'],
})
export class TypesToSelectComponent implements OnInit, OnDestroy {
  types: string[];
  selectedTypes: Set<string> = new Set<string>();
  selectedTypesSubscription: Subscription;

  constructor(private typesService: TypesService) {}

  ngOnInit(): void {
    this.types = types;
    this.selectedTypesSubscription = this.subscribeToSelectedType();
  }

  ngOnDestroy(): void {
    this.selectedTypesSubscription.unsubscribe();
  }

  selectTypes(type) {
    let typeToRemove = false;
    if (this.selectedTypes.size === 0) {
      return this.typesService.selectTypes(type);
    }
    this.selectedTypes.forEach((selectedType) => {
      if (selectedType === type) {typeToRemove = true}
    });
    typeToRemove
      ? this.typesService.removeType(type)
      : this.typesService.selectTypes(type);
  }

  subscribeToSelectedType() {
    return this.typesService.selectedTypes$.subscribe((selectedTypes) => {
      this.selectedTypes = selectedTypes;
    });
  }
}
