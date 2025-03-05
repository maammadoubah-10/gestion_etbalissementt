import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  coursList: any[] = [];

  constructor(private coursService: CoursService, private router: Router) {}

  ngOnInit(): void {
    this.coursService.getCours().subscribe(data => {
      this.coursList = data;
    });
  }

  supprimerCours(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce cours ?')) {
      this.coursService.deleteCours(id).subscribe(() => {
        this.coursList = this.coursList.filter(cours => cours.id !== id);
      });
    }
  }

  modifierCours(id: number) {
    this.router.navigate(['/cours/modifier', id]);
  }
}
