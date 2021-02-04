import {Component, OnDestroy, OnInit} from '@angular/core';
import {Type} from "../../../shared/models/typeEffectiveness.model";
import {TypesService} from "../../services/types.service";
import {ResearchTypeService} from "../../services/research-type.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './select-type-page.component.html',
  styleUrls: ['./select-type-page.component.scss'],
})
export class SelectTypePageComponent implements OnInit, OnDestroy {
  selectedTypes: Set<Type> = new Set<Type>();
  researchButtonLabel = 'Rechercher';

  constructor(
    private typesService: TypesService,
    private researchTypeService: ResearchTypeService
  ) {
  }

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
