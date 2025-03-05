import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { EtudiantsModule } from './modules/etudiants/etudiants.module';
import { AppComponent } from './app.component';
import { ProfesseursModule } from './modules/professeurs/professeurs.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EtudiantsModule,
    ProfesseursModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
