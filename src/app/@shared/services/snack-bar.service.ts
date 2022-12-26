import { Injectable } from '@angular/core';
import {
  MatLegacySnackBar as MatSnackBar,
  MatLegacySnackBarConfig as MatSnackBarConfig,
} from '@angular/material/legacy-snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(public snackBar: MatSnackBar) {}

  openSnackBar(message: string, action?: string) {
    let config = new MatSnackBarConfig();
    config.duration = 10000;
    config.verticalPosition = 'top';
    this.snackBar.open(message, action, config);
  }
}
