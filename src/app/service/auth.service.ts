import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from "../dto/user.dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  register(userDto: UserDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userDto, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
