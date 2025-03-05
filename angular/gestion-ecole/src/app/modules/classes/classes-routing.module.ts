import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AjouterComponent } from './ajouter/ajouter.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'ajouter', component: AjouterComponent },
  { path: 'modifier/:id', component: DetailComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }
