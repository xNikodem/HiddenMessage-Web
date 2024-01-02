import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PUZZLE_API } from "../../constants/api-paths.const";

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  constructor(private http: HttpClient) {}

  public registerVisit(uniqueUrl: string, deviceType: string): Observable<any> {
    if (!this.hasVisited(uniqueUrl)) {
      this.setVisited(uniqueUrl);
      return this.http.post(`${PUZZLE_API}/${uniqueUrl}/register-visit`, deviceType);
    }
    return new Observable(observer => {
      observer.next(null);
      observer.complete();
    });
  }

  private hasVisited(uniqueUrl: string): boolean {
    const visited = localStorage.getItem(`visited_${uniqueUrl}`);
    return !!visited;
  }

  private setVisited(uniqueUrl: string): void {
    localStorage.setItem(`visited_${uniqueUrl}`, 'true');
  }
}
