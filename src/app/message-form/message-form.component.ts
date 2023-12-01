import {Component, ViewChild} from '@angular/core';
import {PuzzleDataService} from "../service/puzzle-data.service";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent {
  public text: string = '';
  public fileSelected: boolean = false;
  @ViewChild('fileInput') public fileInput: any;

  constructor(private puzzleDataService: PuzzleDataService,
              private authService: AuthService) {
  }

  public onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === "text/plain") {
      this.fileSelected = true;
    }
  }

  public loadFileContent() {
    const file = this.fileInput.nativeElement.files[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.text = e.target.result;
      };
      reader.readAsText(file);
    }
  }

  public submitMessage() {
    const puzzleData = this.puzzleDataService.getPuzzleData();
    if (puzzleData) {
      puzzleData.message = this.text;

      this.authService.submitPuzzle(puzzleData).subscribe({
        next: response => {
          this.puzzleDataService.clearData();
        },
        error: error => {
          console.error(error);
        }
      });
    } else {
      console.error("No puzzle data found");
    }
  }
}

