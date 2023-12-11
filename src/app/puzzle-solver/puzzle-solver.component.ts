import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PuzzleService} from "../service/puzzle/puzzle.service";
import {AuthService} from "../service/auth/auth.service";
import {SnackbarService} from "../notifications/snackbar.service";
import {TYPE_PIN} from "../constants/form.const";
import labelsData from "../../assets/i18n/messages.json";

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
  public labels = labelsData.puzzle;
  public puzzleCompleted!: boolean;
  public hiddenMessage = '';
  private uniqueId!: string;
  private correctAnswersCount!: number;
  private readonly UNIQUEID_KEY = 'uniqueId'

  constructor(
    private route: ActivatedRoute,
    private puzzleService: PuzzleService,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {
  }

  public ngOnInit(): void {
    this.puzzleCompleted = false;
    this.correctAnswersCount = 0;
    this.authService.logout();
    this.route.paramMap.subscribe(params => {
      const id = params.get(this.UNIQUEID_KEY);
      if (id !== null) {
        this.uniqueId = id;
        this.loadNextQuestion();
      }
    });
  }

  public submitAnswer(): void {
    if (this.currentQuestion.type === TYPE_PIN) {
      this.userAnswer = this.pinAnswer.join('');
    }
    this.puzzleService.checkAnswer(this.uniqueId, this.userAnswer, this.currentQuestion.questionId)
      .subscribe(
        result => {
          if (result) {
            this.correctAnswersCount++;
            this.loadNextQuestion();
          } else {
            this.snackbarService.openSnackbar(this.labels.wrongAnswer);
          }
        },
        error => {
          this.snackbarService.openSnackbar(this.labels.submitAnswerError);
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

  public loadNextQuestion(): void {
    this.puzzleService.getPuzzle(this.uniqueId, this.correctAnswersCount).subscribe(
      question => {
        this.currentQuestion = question;
        if (this.currentQuestion.type === 'pin') {
          this.pins = new Array(this.currentQuestion.length).fill('');
        }
      },
      error => {
        if (error.status === 303) {
          this.loadPuzzleMessage();
        } else {
          this.snackbarService.openSnackbar(this.labels.loadQuestionError)
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
      this.pinAnswer[index] = '';
      event.target.value = '';
    }
  }

  private loadPuzzleMessage(): void {
    this.puzzleService.getPuzzleMessage(this.uniqueId).subscribe(
      message => {
        this.puzzleCompleted = true;
        this.hiddenMessage=message;
        console.log(message);
      },
      error => {
        this.snackbarService.openSnackbar(this.labels.loadMessageError);
      }
    );
  }

}
