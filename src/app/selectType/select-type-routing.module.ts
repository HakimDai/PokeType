import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectTypePageComponent } from 'src/app/selectType/pages/select-type-page/select-type-page.component';
import { ResultsPageComponent } from 'src/app/selectType/pages/results-page/results-page.component';

const routes: Routes = [
  { path: 'home', component: SelectTypePageComponent },
  { path: 'results', component: ResultsPageComponent },
  { path: '', component: SelectTypePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectTypeRoutingModule {}
