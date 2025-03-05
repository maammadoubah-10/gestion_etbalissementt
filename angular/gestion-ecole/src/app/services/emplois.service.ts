import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmploisService {
  private apiUrl = 'http://localhost:8004/api/emplois'; // ✅ Assure-toi que cette URL est correcte

  constructor(private http: HttpClient) { }

  getEmplois(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getEmploiById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addEmploi(data: any): Observable<any> {
    console.log("🛠️ Données envoyées à l'API :", data);
    return this.http.post<any>('http://localhost:8004/api/emplois', data);
  }
  

  updateEmploi(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteEmploi(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getProfesseurs(): Observable<any> {
    return this.http.get<any>('http://localhost:8002/api/professeurs');
  }

  getCours(): Observable<any> {
    return this.http.get<any>('http://localhost:8003/api/cours');
  }
}
