import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectTypeRoutingModule } from 'src/app/selectType/select-type-routing.module';
import { SelectTypePageComponent } from 'src/app/selectType/select-type-page/select-type-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ResultDialogComponent } from './result-dialog/result-dialog.component';
import { EffectsModule } from '@ngrx/effects';
import { TypesDisplayEffects } from 'src/app/selectType/store/types-display.effects';
import { StoreModule } from '@ngrx/store';
import * as fromTypesDisplay from 'src/app/selectType/store/types-display.reducer';
import { SelectedTypesComponent } from './components/selected-types/selected-types.component';
import { TypesToSelectComponent } from './components/types-to-select/types-to-select.component';
import { ResearchTypeModule } from 'src/app/research-type/research-type.module';

@NgModule({
  declarations: [
    SelectTypePageComponent,
    ResultDialogComponent,
    SelectedTypesComponent,
    TypesToSelectComponent,
  ],
  entryComponents: [ResultDialogComponent],
  imports: [
    CommonModule,
    SelectTypeRoutingModule,
    MatButtonModule,
    MatDividerModule,
    MatGridListModule,
    MatCardModule,
    MatBottomSheetModule,
    EffectsModule.forFeature([TypesDisplayEffects]),
    StoreModule.forFeature(
      fromTypesDisplay.typesDisplayFeatureKey,
      fromTypesDisplay.reducer
    ),
    ResearchTypeModule,
  ],
})
export class SelectTypeModule {}
