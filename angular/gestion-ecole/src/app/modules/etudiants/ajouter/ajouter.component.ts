import { Component, OnInit } from '@angular/core';
import { EtudiantsService } from 'src/app/services/etudiants.service';
import { ClassesService } from 'src/app/services/classes.service'; // 🔥 Import du service Classes
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.css']
})
export class AjouterComponent implements OnInit {
  nouvelEtudiant = { nom: '', prenom: '', email: '', classe_id: null };
  classes: any[] = []; // Stocke la liste des classes

  constructor(
    private etudiantsService: EtudiantsService,
    private classesService: ClassesService, // 🔥 Injecter le service
    private router: Router
  ) {}

  ngOnInit(): void {
    // 🔥 Récupérer la liste des classes dès le chargement du formulaire
    this.classesService.getClasses().subscribe(data => {
      this.classes = data;
    });
  }

  ajouterEtudiant() {
    this.etudiantsService.addEtudiant(this.nouvelEtudiant).subscribe(() => {
      this.router.navigate(['/etudiants']);
    });
  }
}
