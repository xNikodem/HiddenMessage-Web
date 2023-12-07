import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AnswerDto} from "../dto/answer.dto";

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {
  private apiUrl = 'http://localhost:8080/api/puzzles';

  constructor(private http: HttpClient) { }

  public getPuzzle(uniqueId: string, correctAnswersCount: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${uniqueId}/next-question`, { headers: { 'Correct-Answers-Count': correctAnswersCount.toString() } });
  }

  public checkAnswer(uniqueUrl: string, answer: any,questionId:number): Observable<any> {
    const answerdto:AnswerDto= {
      questionId:questionId,
      answer:answer
    }
    return this.http.post(`${this.apiUrl}/${uniqueUrl}/check-answer`, answerdto);
  }

  public getPuzzleMessage(uniqueUrl: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/${uniqueUrl}/message`, { responseType: 'text' });
  }
}
