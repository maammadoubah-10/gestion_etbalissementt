import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  classes: any[] = [];

  constructor(private classesService: ClassesService, private router: Router) {}

  ngOnInit(): void {
    this.classesService.getClasses().subscribe(data => {
      this.classes = data;
    });
  }

  supprimerClasse(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cette classe ?')) {
      this.classesService.deleteClasse(id).subscribe(() => {
        this.classes = this.classes.filter(c => c.id !== id);
      });
    }
  }

  modifier(id: number) {
    this.router.navigate(['/classes/modifier', id]);
  }
}
