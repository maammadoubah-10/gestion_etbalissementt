import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EtudiantsService } from 'src/app/services/etudiants.service';
import { ClassesService } from 'src/app/services/classes.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  etudiant: any = { nom: '', prenom: '', email: '', classe_id: null };
  classes: any[] = [];
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private etudiantsService: EtudiantsService,
    private classesService: ClassesService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.etudiantsService.getEtudiantById(this.id).subscribe(data => {
      this.etudiant = data;
    });

    this.classesService.getClasses().subscribe(data => {
      this.classes = data;
    });
  }

  modifierEtudiant() {
    console.log("Modification en cours..."); // ✅ Vérification dans la console
    console.log("Données envoyées :", this.etudiant); // ✅ Vérification

    this.etudiantsService.updateEtudiant(this.id, this.etudiant).subscribe(
      response => {
        console.log("Étudiant modifié avec succès :", response); // ✅ Debug API
        this.router.navigate(['/etudiants']); // ✅ Redirection après modification
      },
      error => {
        console.error("Erreur lors de la modification :", error);
      }
    );
}

}
