import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearchButtonComponent } from './components/research-button/research-button.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ResearchButtonComponent],
  exports: [ResearchButtonComponent],
  imports: [CommonModule, MatButtonModule],
})
export class ResearchTypeModule {}
