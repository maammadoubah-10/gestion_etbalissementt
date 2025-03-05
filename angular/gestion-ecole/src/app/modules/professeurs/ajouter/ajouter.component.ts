import { Component } from '@angular/core';
import { ProfesseursService } from 'src/app/services/professeurs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.css']
})
export class AjouterComponent {
  nouveauProf = { nom: '', prenom: '', email: '', specialite: '' };

  constructor(private professeursService: ProfesseursService, private router: Router) {}

  ajouterProfesseur() {
    this.professeursService.addProfesseur(this.nouveauProf).subscribe(() => {
      this.router.navigate(['/professeurs']); // Redirige vers la liste après ajout
    });
  }
}
