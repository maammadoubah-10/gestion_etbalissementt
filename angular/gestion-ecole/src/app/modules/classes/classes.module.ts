import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesRoutingModule } from './classes-routing.module';
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
    ClassesRoutingModule,
    FormsModule
  ]
})
export class ClassesModule { }
