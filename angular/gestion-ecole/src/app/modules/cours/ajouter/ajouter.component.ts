import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.css']
})
export class AjouterComponent implements OnInit {
  nouvelCours = { nom: '', code: '', description: '', classe_id: null, professeur_id: null };
  classes: any[] = [];
  professeurs: any[] = [];

  constructor(private coursService: CoursService, private router: Router) {}

  ngOnInit(): void {
    // ✅ Vérifier que les classes sont bien récupérées
    this.coursService.getClasses().subscribe(
      data => {
        console.log("Classes récupérées :", data);
        this.classes = data;
      },
      error => console.error("Erreur lors de la récupération des classes :", error)
    );

    // ✅ Vérifier que les professeurs sont bien récupérés
    this.coursService.getProfesseurs().subscribe(
      data => {
        console.log("Professeurs récupérés :", data);
        this.professeurs = data;
      },
      error => console.error("Erreur lors de la récupération des professeurs :", error)
    );
  }

  ajouterCours() {
    console.log("Données envoyées :", this.nouvelCours); // 🔥 Vérifie si les données sont bien envoyées

    this.coursService.addCours(this.nouvelCours).subscribe(() => {
      this.router.navigate(['/cours/list']); // ✅ Redirection après ajout
    });
  }
}
