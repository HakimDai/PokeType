import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectTypeRoutingModule } from 'src/app/selectType/select-type-routing.module';
import { SelectTypePageComponent } from 'src/app/selectType/pages/select-type-page/select-type-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { SelectedTypesComponent } from './components/selected-types/selected-types.component';
import { TypesToSelectComponent } from './components/types-to-select/types-to-select.component';
import { ButtonComponent } from 'src/app/selectType/components/button/button.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ResultsPageComponent } from 'src/app/selectType/pages/results-page/results-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    SelectTypePageComponent,
    SelectedTypesComponent,
    TypesToSelectComponent,
    ButtonComponent,
    ResultsPageComponent,
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
    MatProgressSpinnerModule,
  ],
})
export class SelectTypeModule {}
