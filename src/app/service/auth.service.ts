import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {UserDto} from "../dto/user.dto";
import {LOGIN_API, PUZZLE_API, REGISTER_API} from "../constants/api-paths.const";
import {PuzzleDto} from "../dto/puzzle.dto";

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
    return this.http.post(LOGIN_API, userDto, { responseType: 'json' })
      .pipe(
        tap((response: any) => {
          const token = response.accessToken as string;
          this.setSession(token);
        }),
        catchError(error => throwError(() => new Error(error.message)))
      );
  }

  public submitPuzzle(puzzle: PuzzleDto): Observable<any> {
    return this.http.post(PUZZLE_API, puzzle, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getJwtToken()}`
      })
    });
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

  private getJwtToken(): string {
    return localStorage.getItem('jwt_token') || '';
  }
}
