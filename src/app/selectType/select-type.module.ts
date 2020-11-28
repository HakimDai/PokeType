import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectTypeRoutingModule } from 'src/app/selectType/select-type-routing.module';
import { SelectTypePageComponent } from 'src/app/selectType/select-type-page/select-type-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { SelectedTypesComponent } from './components/selected-types/selected-types.component';
import { TypesToSelectComponent } from './components/types-to-select/types-to-select.component';
import { ResearchButtonComponent } from 'src/app/selectType/components/research-button/research-button.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ResultsDialogComponent } from 'src/app/selectType/components/display-best-types-dialog/results-dialog.component';

@NgModule({
  declarations: [
    SelectTypePageComponent,
    SelectedTypesComponent,
    TypesToSelectComponent,
    ResearchButtonComponent,
    ResultsDialogComponent,
  ],
  imports: [
    CommonModule,
    SelectTypeRoutingModule,
    MatButtonModule,
    MatDividerModule,
    MatGridListModule,
    MatCardModule,
    MatBottomSheetModule,
    MatDialogModule,
  ],
})
export class SelectTypeModule {}
