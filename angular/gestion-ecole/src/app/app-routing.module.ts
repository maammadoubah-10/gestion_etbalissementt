import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent as ListEtudiantsComponent } from './modules/etudiants/list/list.component';
const routes: Routes = [
  { path: 'classes', loadChildren: () => import('./modules/classes/classes.module').then(m => m.ClassesModule) },
  { path: 'cours', loadChildren: () => import('./modules/cours/cours.module').then(m => m.CoursModule) },
  { path: 'etudiants', loadChildren: () => import('./modules/etudiants/etudiants.module').then(m => m.EtudiantsModule) },
  { path: 'professeurs', loadChildren: () => import('./modules/professeurs/professeurs.module').then(m => m.ProfesseursModule) },
  { path: 'emplois', loadChildren: () => import('./modules/emplois/emplois.module').then(m => m.EmploisModule) },
  { path: '', redirectTo: '/etudiants', pathMatch: 'full' } // Redirection par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
