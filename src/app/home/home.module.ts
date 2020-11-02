import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomePageComponent} from './home-page/home-page.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {ResultDialogComponent} from './result-dialog/result-dialog.component';
import {EffectsModule} from '@ngrx/effects';
import {TypesDisplayEffects} from 'src/app/home/store/types-display.effects';
import {StoreModule} from '@ngrx/store';
import * as fromTypesDisplay from 'src/app/home/store/types-display.reducer';


@NgModule({
  declarations: [HomePageComponent, ResultDialogComponent],
  entryComponents: [ResultDialogComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    MatDividerModule,
    MatGridListModule,
    MatCardModule,
    MatBottomSheetModule,
    EffectsModule.forFeature([TypesDisplayEffects]),
    StoreModule.forFeature(fromTypesDisplay.typesDisplayFeatureKey, fromTypesDisplay.reducer)
  ]
})
export class HomeModule {
}
