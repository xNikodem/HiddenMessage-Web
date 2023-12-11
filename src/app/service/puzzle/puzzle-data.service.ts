import {Injectable} from '@angular/core';
import {PuzzleDto} from "../../dto/puzzle.dto";

@Injectable({
  providedIn: 'root'
})
export class PuzzleDataService {
  private puzzleData: PuzzleDto | null = null;

  public setPuzzleData(data: PuzzleDto): void {
    this.puzzleData = data;
  }

  public getPuzzleData(): PuzzleDto | null {
    return this.puzzleData;
  }

  public clearData(): void {
    this.puzzleData = null;
  }
}
