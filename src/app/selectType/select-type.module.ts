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
import { ResearchButtonComponent } from 'src/app/selectType/components/research-button/research-button.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ResultsPageComponent } from 'src/app/selectType/pages/results-page/results-page.component';
import { ResultsResolver } from './resolvers/results-resolver.service';

@NgModule({
  declarations: [
    SelectTypePageComponent,
    SelectedTypesComponent,
    TypesToSelectComponent,
    ResearchButtonComponent,
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
  ],
  providers: [ResultsResolver],
})
export class SelectTypeModule {}
