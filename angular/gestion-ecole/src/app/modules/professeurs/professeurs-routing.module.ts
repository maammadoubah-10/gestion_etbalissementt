import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { AjouterComponent } from './ajouter/ajouter.component';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'ajouter', component: AjouterComponent },
  { path: 'modifier/:id', component: DetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesseursRoutingModule { }
