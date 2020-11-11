import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectTypePageComponent } from 'src/app/selectType/select-type-page/select-type-page.component';

const routes: Routes = [
  { path: 'home', component: SelectTypePageComponent },
  { path: '', component: SelectTypePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectTypeRoutingModule {}
