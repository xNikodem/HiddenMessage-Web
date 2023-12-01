import { Injectable } from '@angular/core';
import { PuzzleDto } from "../dto/puzzle.dto";

@Injectable({
  providedIn: 'root'
})
export class PuzzleDataService {
  private puzzleData: PuzzleDto | null = null;

  public setPuzzleData(data: PuzzleDto) {
    this.puzzleData = data;
  }

  public getPuzzleData(): PuzzleDto | null {
    return this.puzzleData;
  }

  public clearData() {
    this.puzzleData = null;
  }
}
