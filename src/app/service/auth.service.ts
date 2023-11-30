import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {UserDto} from "../dto/user.dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private jwtToken: string | null = null;

  constructor(private http: HttpClient) {
  }

  public register(userDto: UserDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userDto, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  public login(userDto: UserDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userDto, {responseType: 'text'})
      .pipe(
        tap(token => this.setSession(token)),
        catchError(error => throwError(() => new Error(error.message)))
      );
  }

  public logout() {
    localStorage.removeItem('jwt_token');
    this.jwtToken = null;
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt_token');
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    return false;
  }

  private setSession(authResult: string) {
    localStorage.setItem('jwt_token', authResult);
    this.jwtToken = authResult;
  }
}
