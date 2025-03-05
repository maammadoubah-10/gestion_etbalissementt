import { Component, OnInit } from '@angular/core';
import { EmploisService } from 'src/app/services/emplois.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  emplois: any[] = [];

  constructor(private emploisService: EmploisService, private router: Router) {}

  ngOnInit(): void {
    this.emploisService.getEmplois().subscribe(
      data => {
        console.log("Emplois reçus :", data); // ✅ Vérification des emplois
        this.emplois = data;
      },
      error => {
        console.error("Erreur API :", error);
      }
    );
  }

  supprimerEmploi(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet emploi du temps ?')) {
      this.emploisService.deleteEmploi(id).subscribe(() => {
        this.emplois = this.emplois.filter(e => e.id !== id);
      });
    }
  }

  modifier(id: number) {
    this.router.navigate(['/emplois/modifier', id]); // ✅ Redirige vers la page de modification
  }
}
