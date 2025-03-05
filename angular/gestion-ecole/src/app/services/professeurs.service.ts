import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesseursService {
  private apiUrl = 'http://localhost:8003/api/professeurs'; // URL de l'API des professeurs

  constructor(private http: HttpClient) { }

  // Récupérer la liste des professeurs
  getProfesseurs(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Récupérer un professeur par son ID
  getProfesseurById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Ajouter un professeur
  addProfesseur(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // Modifier un professeur
  updateProfesseur(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // Supprimer un professeur
  deleteProfesseur(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
