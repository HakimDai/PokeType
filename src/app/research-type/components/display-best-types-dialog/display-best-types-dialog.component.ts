import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TypesService } from 'src/app/selectType/services/types.service';
import { Type } from 'src/app/shared/typeEffectiveness';

@Component({
  selector: 'app-display-best-types-dialog',
  templateUrl: './display-best-types-dialog.component.html',
  styleUrls: ['./display-best-types-dialog.component.scss'],
})
export class DisplayBestTypesDialogComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string[],
    private typeService: TypesService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.typeService.selectedTypes.forEach((type) => (type.isSelected = false));
    this.typeService.selectedTypes$.next(
      (this.typeService.selectedTypes = new Set<Type>())
    );
  }
}
