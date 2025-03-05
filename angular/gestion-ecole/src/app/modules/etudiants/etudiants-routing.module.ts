import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component'; // Utilisé pour modifier
import { AjouterComponent } from './ajouter/ajouter.component'; // Nouveau
const routes: Routes = [
  { path: 'list', component: ListComponent }, // ✅ Correction ici
  { path: '', redirectTo: 'list', pathMatch: 'full' } ,
  { path: 'ajouter', component: AjouterComponent },
  { path: 'modifier/:id', component: DetailComponent }// ✅ Redirige vers la liste
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtudiantsRoutingModule { }
 