import { Component, OnInit } from '@angular/core';
import { TypesService } from 'src/app/selectType/services/types.service';
import { Type } from 'src/app/shared/models/typeEffectiveness.model';

@Component({
  selector: 'app-selected-types',
  templateUrl: './selected-types.component.html',
  styleUrls: ['./selected-types.component.scss'],
})
export class SelectedTypesComponent implements OnInit {
  selectedTypes: Set<Type>;

  constructor(private typeService: TypesService) {}

  ngOnInit(): void {
    this.typeService.selectedTypes$.subscribe(
      (selectedtypes) => (this.selectedTypes = selectedtypes)
    );
  }

  removeType(type) {
    this.typeService.removeType(type);
  }
}
