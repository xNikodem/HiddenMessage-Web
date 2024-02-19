import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnswerDto } from "../../dto/answer.dto";
import { PuzzleDto } from "../../dto/puzzle.dto";
import { PUZZLE_API } from "../../constants/api-paths.const";

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  constructor(private http: HttpClient) { }

  public getPuzzle(uniqueId: string, correctAnswersCount: number): Observable<any> {
    return this.http.get(`${PUZZLE_API}/${uniqueId}/next-question`, { headers: { 'Correct-Answers-Count': correctAnswersCount.toString() } });
  }

  public checkAnswer(uniqueUrl: string, answer: any, questionId: number): Observable<any> {
    const answerdto: AnswerDto = {
      questionId: questionId,
      answer: answer
    }
    return this.http.post(`${PUZZLE_API}/${uniqueUrl}/check-answer`, answerdto);
  }

  public getPuzzleMessage(uniqueUrl: string): Observable<string> {
    return this.http.get(`${PUZZLE_API}/${uniqueUrl}/message`, { responseType: 'text' });
  }

  public submitPuzzle(puzzle: PuzzleDto): Observable<string> {
    return this.http.post<string>(PUZZLE_API, puzzle, {
      headers: this.getHeaders(),
      responseType: 'text' as 'json'
    });
  }

  public hasUserCreatedPuzzle(): Observable<boolean> {
    return this.http.get<boolean>(`${PUZZLE_API}/has-puzzle`);
  }


  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getJwtToken()}`
    });
  }

  private getJwtToken(): string {
    return localStorage.getItem('jwt_token') || '';
  }
}
