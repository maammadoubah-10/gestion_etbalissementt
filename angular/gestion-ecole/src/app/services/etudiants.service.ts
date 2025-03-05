import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtudiantsService {
  private apiUrl = 'http://localhost:8000/api/etudiants';

  constructor(private http: HttpClient) { }

  getEtudiants(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getEtudiantById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addEtudiant(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateEtudiant(id: number, data: any): Observable<any> {
    console.log("Données envoyées à l'API :", data); // ✅ Debug API
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteEtudiant(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
