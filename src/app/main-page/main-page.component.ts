import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import labelsData from '../../assets/i18n/messages.json';
import routesData from '../../assets/paths.json';
import {PuzzleService} from "../service/puzzle/puzzle.service";
import {AuthService} from "../service/auth/auth.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit{
  public labels = labelsData.main;
  private routes = routesData.routes
  hasCreatedPuzzle = false;

  constructor(private router: Router,
              private puzzleService: PuzzleService,
              private authService: AuthService) {
  }

  public create(): void {
    this.router.navigate(['/' + this.routes.createPuzzle]);
  }

  public ngOnInit(): void {
    this.puzzleService.hasUserCreatedPuzzle().subscribe(
      hasCreated => {
        this.hasCreatedPuzzle = hasCreated;
        console.log(this.hasCreatedPuzzle);
      },
      error => {
        console.error('Error checking puzzle creation status', error);
      }
    );
  }

}
