import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmploisRoutingModule } from './emplois-routing.module';
import { ListComponent } from './list/list.component';
import { AjouterComponent } from './ajouter/ajouter.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListComponent,
    AjouterComponent
  ],
  imports: [
    CommonModule,
    EmploisRoutingModule,
    FormsModule
  ]
})
export class EmploisModule { }
