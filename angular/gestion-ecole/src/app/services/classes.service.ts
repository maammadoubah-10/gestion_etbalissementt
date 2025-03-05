import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  private apiUrl = 'http://localhost:8001/api/classes'; // URL du microservice classes

  constructor(private http: HttpClient) { }

  getClasses(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getClasseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addClasse(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateClasse(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteClasse(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
