import { Component, OnInit } from '@angular/core';
import { EtudiantsService } from 'src/app/services/etudiants.service';
import { Router } from '@angular/router'; // 🔥 Ajout de l'import manquant

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  etudiants: any[] = [];

  constructor(private etudiantsService: EtudiantsService, private router: Router) {} // ✅ Ajout du Router ici

  ngOnInit(): void {
    this.etudiantsService.getEtudiants().subscribe(
      data => {
        console.log("Données reçues :", data); // ✅ Vérifie les données dans la console
        this.etudiants = data;
      },
      error => {
        console.error("Erreur API :", error); // ✅ Vérifie si l'API renvoie une erreur
      }
    );
  }

  supprimerEtudiant(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet étudiant ?')) {
      this.etudiantsService.deleteEtudiant(id).subscribe(() => {
        this.etudiants = this.etudiants.filter(e => e.id !== id);
      });
    }
  }

  modifier(id: number) {
    this.router.navigate(['/etudiants/modifier', id]); // ✅ Redirige vers la page de modification
  }
}
