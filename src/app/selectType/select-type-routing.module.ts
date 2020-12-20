import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectTypePageComponent } from 'src/app/selectType/pages/select-type-page/select-type-page.component';
import { ResultsPageComponent } from 'src/app/selectType/pages/results-page/results-page.component';
import { ResultGuard } from 'src/app/selectType/guards/result-guard.service';
import { ResultsResolver } from 'src/app/selectType/resolvers/results-resolver.service';

const routes: Routes = [
  { path: 'home', component: SelectTypePageComponent },
  {
    path: 'results',
    component: ResultsPageComponent,
    resolve: { results: ResultsResolver },
    canActivate: [ResultGuard],
  },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectTypeRoutingModule {}
