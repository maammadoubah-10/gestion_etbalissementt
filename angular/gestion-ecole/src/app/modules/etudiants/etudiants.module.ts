import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EtudiantsRoutingModule } from './etudiants-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { AjouterComponent } from './ajouter/ajouter.component';

@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    AjouterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EtudiantsRoutingModule
  ]
})
export class EtudiantsModule { }
