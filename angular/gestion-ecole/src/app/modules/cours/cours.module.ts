import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursRoutingModule } from './cours-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { AjouterComponent } from './ajouter/ajouter.component';
import { FormsModule } from '@angular/forms'; // ✅ Ajout de FormsModule

@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    AjouterComponent
  ],
  imports: [
    CommonModule,
    CoursRoutingModule,
    FormsModule // ✅ Ajout de FormsModule pour que ngModel fonctionne
  ]
})
export class CoursModule { }
