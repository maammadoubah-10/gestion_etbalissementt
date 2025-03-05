import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesseursRoutingModule } from './professeurs-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { AjouterComponent } from './ajouter/ajouter.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    AjouterComponent
  ],
  imports: [
    CommonModule,
    ProfesseursRoutingModule,
    FormsModule
  ]
})
export class ProfesseursModule { }
