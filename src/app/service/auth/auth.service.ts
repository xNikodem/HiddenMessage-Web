import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {UserDto} from "../../dto/user.dto";
import {LOGIN_API, REGISTER_API} from "../../constants/api-paths.const";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtToken: string | null = null;

  constructor(private http: HttpClient) {
  }

  public register(userDto: UserDto): Observable<any> {
    return this.http.post(REGISTER_API, userDto, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  public login(userDto: UserDto): Observable<any> {
    return this.http.post(LOGIN_API, userDto, {responseType: 'json'})
      .pipe(
        tap((response: any) => {
          const token = response.accessToken as string;
          this.setSession(token);
        }),
        catchError(error => throwError(() => new Error(error.message)))
      );
  }

  public logout(): void {
    localStorage.removeItem('jwt_token');
    this.jwtToken = null;
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt_token');
    return !!token && !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    return false;
  }

  private setSession(authResult: string): void {
    localStorage.setItem('jwt_token', authResult);
    this.jwtToken = authResult;
  }
}
