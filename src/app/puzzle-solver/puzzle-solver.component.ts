import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PuzzleService} from "../service/puzzle.service";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-puzzle-solver',
  templateUrl: './puzzle-solver.component.html',
  styleUrls: ['./puzzle-solver.component.scss']
})
export class PuzzleSolverComponent implements OnInit {
  public currentQuestion: any;
  public userAnswer: any = '';
  public pins: string[] = [];
  public pinAnswer: string[] = [];
  private uniqueId!: string;
  private correctAnswersCount!: number;

  constructor(
    private route: ActivatedRoute,
    private puzzleService: PuzzleService,
    private authService: AuthService
  ) {
  }

  public ngOnInit(): void {
    this.correctAnswersCount = 0;
    this.authService.logout();
    this.route.paramMap.subscribe(params => {
      const id = params.get('uniqueId');
      if (id !== null) {
        this.uniqueId = id;
        this.loadNextQuestion();
      } else {
        console.error('UniqueId is null');
      }
    });
  }

  public submitAnswer(): void {
    if (this.currentQuestion.type === 'pin') {
      this.userAnswer = this.pinAnswer.join('');
    }
    console.log(this.userAnswer);
    this.puzzleService.checkAnswer(this.uniqueId, this.userAnswer, this.currentQuestion.questionId)
      .subscribe(
        result => {
          if (result) {
            this.correctAnswersCount++;
            this.loadNextQuestion();
          } else {
            alert('Incorrect answer. Try again.');
          }
        },
        error => {
          console.error('Error submitting answer:', error);
        }
      );
    this.userAnswer = '';
  }

  public validateNumberInput(event: any, maxNumber: number): void {
    const value = parseInt(event.target.value, 10);
    if (value > maxNumber) {
      event.target.value = maxNumber;
    }
  }

  loadNextQuestion(): void {
    this.puzzleService.getPuzzle(this.uniqueId, this.correctAnswersCount).subscribe(
      question => {
        this.currentQuestion = question;
        if (this.currentQuestion.type === 'pin') {
          this.pins = new Array(this.currentQuestion.length).fill('');
        }
      },
      error => {
        if (error.status === 404) {
          this.loadPuzzleMessage();
        } else {
          console.error('Error fetching next question:', error);
        }
      }
    );
  }

  public handlePinInput(event: any, index: number): void {
    const value = event.target.value;
    if (value && !isNaN(value) && value.length === 1 && value >= 0 && value <= 9) {
      this.pinAnswer[index] = value;
      if (index < this.pins.length - 1) {
        const nextInput = document.querySelector(`input[data-id="${index + 1}"]`) as HTMLElement;
        if (nextInput) {
          nextInput.focus();
        }
      }
    } else {
      event.target.value = '';
    }
  }

  private loadPuzzleMessage(): void {
    this.puzzleService.getPuzzleMessage(this.uniqueId).subscribe(
      message => {
        console.log(message)
      },
      error => {
        console.error('Error fetching puzzle message:', error);
      }
    );
  }
}
