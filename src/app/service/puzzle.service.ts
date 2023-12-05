import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {
  private apiUrl = 'http://localhost:8080/api/puzzles';

  constructor(private http: HttpClient) { }

  public getPuzzle(uniqueId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${uniqueId}`);
  }
}
