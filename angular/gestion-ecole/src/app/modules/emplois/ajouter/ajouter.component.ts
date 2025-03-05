import { Component, OnInit } from '@angular/core';
import { EmploisService } from 'src/app/services/emplois.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.css']
})
export class AjouterComponent implements OnInit {
  nouvelEmploi = { jour: '', heure_debut: '', heure_fin: '', salle: '', professeur_id: null, cours_id: null };
  professeurs: any[] = [];
  cours: any[] = [];

  constructor(private emploisService: EmploisService, private router: Router) {}

  ngOnInit(): void {
    this.emploisService.getProfesseurs().subscribe(data => {
      console.log("✅ Professeurs récupérés :", data);
      this.professeurs = data;
    });
  
    this.emploisService.getCours().subscribe(data => {
      console.log("✅ Cours récupérés :", data);
      this.cours = data;
    });
  }
  

  ajouterEmploi() {
    console.log("✅ Données envoyées :", this.nouvelEmploi);  // Vérifier les données
    this.emploisService.addEmploi(this.nouvelEmploi).subscribe(
      () => {
        console.log("✅ Emploi ajouté avec succès !");
        this.router.navigate(['/emplois']); // Redirige vers la liste après ajout
      },
      error => {
        console.error("🚨 Erreur lors de l'ajout :", error);
      }
    );
  }
}
