import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassesService } from 'src/app/services/classes.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  classe: any = { nom: '', niveau: '' };
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private classesService: ClassesService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    // Récupère les informations de la classe à modifier
    this.classesService.getClasseById(this.id).subscribe(data => {
      this.classe = data;
    });
  }

  modifierClasse() {
    this.classesService.updateClasse(this.id, this.classe).subscribe(() => {
      this.router.navigate(['/classes']); // Redirige vers la liste après modification
    });
  }
}
