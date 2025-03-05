import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  private apiUrl = 'http://localhost:8003/api/cours'; // ✅ API des cours
  private classesUrl = 'http://localhost:8001/api/classes'; // ✅ API des classes
  private professeursUrl = 'http://localhost:8002/api/professeurs'; // ✅ API des professeurs

  constructor(private http: HttpClient) {}

  // ✅ Récupérer la liste des cours
  getCours(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // ✅ Récupérer un cours par son ID
  getCoursById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // ✅ Ajouter un nouveau cours
  addCours(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // ✅ Modifier un cours existant
  updateCours(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // ✅ Supprimer un cours
  deleteCours(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // ✅ Récupérer la liste des classes pour afficher dans les formulaires
  getClasses(): Observable<any> {
    return this.http.get<any>(this.classesUrl);
  }

  // ✅ Récupérer la liste des professeurs pour afficher dans les formulaires
  getProfesseurs(): Observable<any> {
    return this.http.get<any>(this.professeursUrl);
  }
}
