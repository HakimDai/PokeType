import { Component, OnDestroy, OnInit } from '@angular/core';
import { Type } from 'src/app/shared/models/typeEffectiveness.model';
import { TypesService } from 'src/app/selectType/services/types.service';
import { ResearchTypeService } from 'src/app/research-type/services/research-type.service';

@Component({
  selector: 'app-research-button',
  templateUrl: './research-button.component.html',
  styleUrls: ['./research-button.component.scss'],
})
export class ResearchButtonComponent implements OnInit, OnDestroy {
  selectedTypes: Set<Type> = new Set<Type>();

  constructor(
    private typesService: TypesService,
    private researchTypeService: ResearchTypeService
  ) {}

  ngOnInit(): void {
    this.selectedTypesSubscription();
  }

  ngOnDestroy() {
    this.selectedTypesSubscription().unsubscribe();
  }

  selectedTypesSubscription = () => {
    return this.typesService.selectedTypes$.subscribe((selectedTypes) => {
      this.selectedTypes = selectedTypes;
    });
  };

  researchTypes() {
    this.researchTypeService.searchType(this.selectedTypes);
  }
}
