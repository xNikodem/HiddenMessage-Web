import {Component, ViewChild} from '@angular/core';
import {PuzzleDataService} from "../service/puzzle/puzzle-data.service";
import {SnackbarService} from "../notifications/snackbar.service";
import labelsData from '../../assets/i18n/messages.json';
import routesData from '../../assets/paths.json';
import {PuzzleService} from "../service/puzzle/puzzle.service";

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent {
  public text: string = '';
  public fileSelected: boolean = false;
  @ViewChild('fileInput')
  public fileInput: any;
  public labels = labelsData.messageForm;
  public puzzleLink: string | null = null;
  private routes = routesData.routes;
  private readonly FILE_TYPE: string = "text/plain";

  constructor(private puzzleDataService: PuzzleDataService,
              private snackbar: SnackbarService,
              private puzzleService: PuzzleService) {
  }

  public onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === this.FILE_TYPE) {
      this.fileSelected = true;
    }
  }

  public loadFileContent(): void {
    const file = this.fileInput.nativeElement.files[0];
    if (file && file.type === this.FILE_TYPE) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.text = e.target.result;
      };
      reader.readAsText(file);
    }
  }

  public submitMessage(): void {
    const puzzleData = this.puzzleDataService.getPuzzleData();
    if (puzzleData) {
      puzzleData.message = this.text;

      this.puzzleService.submitPuzzle(puzzleData).subscribe({
        next: uniqueId => {
          this.puzzleDataService.clearData();
          this.puzzleLink = `${window.location.origin}/${uniqueId}`;
        },
        error: error => {
          console.error(error);
        }
      });
    } else {
      this.snackbar.snackbarRedirect(this.labels.noPuzzleError, '/' + this.routes.main);
    }
  }

  public copyLinkToClipboard(): void {
    if (this.puzzleLink) {
      navigator.clipboard.writeText(this.puzzleLink).then(() => {
        this.snackbar.openSnackbar(this.labels.copySuccess);
      }).catch(() => {
        this.snackbar.openSnackbar(this.labels.copyError);
      });
    }
  }
}

