import { Component } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.css']
})
export class AjouterComponent {
  nouvelleClasse = { nom: '', niveau: '' };

  constructor(private classesService: ClassesService, private router: Router) {}

  ajouterClasse() {
    this.classesService.addClasse(this.nouvelleClasse).subscribe(() => {
      this.router.navigate(['/classes']); // Redirige vers la liste après ajout
    });
  }
}
