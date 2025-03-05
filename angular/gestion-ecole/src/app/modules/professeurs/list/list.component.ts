import { Component, OnInit } from '@angular/core';
import { ProfesseursService } from 'src/app/services/professeurs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  professeurs: any[] = []; // Liste des professeurs

  constructor(private professeursService: ProfesseursService, private router: Router) {}

  ngOnInit(): void {
    this.professeursService.getProfesseurs().subscribe(
      data => {
        console.log("Professeurs reçus :", data); // ✅ Debug
        this.professeurs = data;
      },
      error => {
        console.error("Erreur API :", error); // ✅ Debug
      }
    );
  }

  supprimerProfesseur(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce professeur ?')) {
      this.professeursService.deleteProfesseur(id).subscribe(() => {
        this.professeurs = this.professeurs.filter(p => p.id !== id);
      });
    }
  }

  modifier(id: number) {
    this.router.navigate(['/professeurs/modifier', id]); // ✅ Redirection vers modification
  }

  ajouterProfesseur() {
    this.router.navigate(['/professeurs/ajouter']); // ✅ Redirection vers ajout
  }
}
