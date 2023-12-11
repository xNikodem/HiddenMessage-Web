import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private basicAction = "Close";
  private redirectAction = "Restart";
  private basicDuration = 3000;

  constructor(private snackBar: MatSnackBar,
              private router: Router) {
  }

  public snackbarRedirect(message: string, route: string, action: string = this.redirectAction): void {
    const snackbarRef = this.snackBar.open(message, action);
    snackbarRef.onAction().subscribe(() => {
      this.router.navigate([route]);
    })
  }

  public openSnackbar(message: string, action: string = this.basicAction, duration: number = this.basicDuration): void {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }
}
