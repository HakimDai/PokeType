import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearchButtonComponent } from './components/research-button/research-button.component';
import { MatButtonModule } from '@angular/material/button';
import { DisplayBestTypesDialogComponent } from './components/display-best-types-dialog/display-best-types-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ResearchButtonComponent, DisplayBestTypesDialogComponent],
  exports: [ResearchButtonComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule],
})
export class ResearchTypeModule {}
