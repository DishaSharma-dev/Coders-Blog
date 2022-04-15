import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private snackBar : MatSnackBar) { }
  openSnackBar(message: string, css: string) {
    this.snackBar.open(message, "OK", {
      panelClass : css,
      duration : 3000,
    });
  }
}
