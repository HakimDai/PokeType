import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomePageComponent} from './home-page/home-page.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { ResultDialogComponent } from './result-dialog/result-dialog.component';


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
    MatBottomSheetModule
  ]
})
export class HomeModule {
}
