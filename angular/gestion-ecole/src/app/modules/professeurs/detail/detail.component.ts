import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesseursService } from 'src/app/services/professeurs.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  prof: any = { nom: '', prenom: '', email: '', specialite: '' };
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private professeursService: ProfesseursService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    // Récupère les informations du professeur à modifier
    this.professeursService.getProfesseurById(this.id).subscribe(data => {
      this.prof = data;
    });
  }

  modifierProfesseur() {
    this.professeursService.updateProfesseur(this.id, this.prof).subscribe(() => {
      this.router.navigate(['/professeurs']); // Redirige vers la liste après modification
    });
  }
}
