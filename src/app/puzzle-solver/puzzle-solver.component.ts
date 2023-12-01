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
  uniqueId!: string;
  puzzleData: any;

  constructor(
    private route: ActivatedRoute,
    private puzzleService: PuzzleService,
    private authservice:AuthService
  ) { }

  ngOnInit(): void {
    this.authservice.logout();
    this.route.paramMap.subscribe(params => {
      const id = params.get('uniqueId');
      if (id !== null) {
        this.uniqueId = id;
        this.getPuzzle();
      } else {
        console.error('UniqueId is null');
      }
    });
  }


  getPuzzle(): void {
    this.puzzleService.getPuzzle(this.uniqueId).subscribe(
      data => {
        this.puzzleData = data;
      },
      error => {
        console.error('Error fetching puzzle:', error);
      }
    );
  }
}
