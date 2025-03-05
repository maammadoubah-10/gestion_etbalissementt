import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  cours: any = { nom: '', code: '', description: '', classe_id: null, professeur_id: null };
  classes: any[] = [];
  professeurs: any[] = [];
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursService: CoursService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    // Récupérer les infos du cours
    this.coursService.getCoursById(this.id).subscribe(data => {
      this.cours = data;
    });

    // Récupérer la liste des classes
    this.coursService.getClasses().subscribe(data => {
      this.classes = data;
    });

    // Récupérer la liste des professeurs
    this.coursService.getProfesseurs().subscribe(data => {
      this.professeurs = data;
    });
  }

  modifierCours() {
    console.log('Modification en cours...');
    this.coursService.updateCours(this.id, this.cours).subscribe(() => {
      this.router.navigate(['/cours/list']); // ✅ Redirige après modification
    });
  }
}
