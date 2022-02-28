import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { Card } from '../_interfaces/card.interface';

@Injectable({
  providedIn: 'root',
})
export class DeskService {
  private itemsSubject = new BehaviorSubject<Card[]>([]);
  items$ = this.itemsSubject.asObservable();
  existingCartItems: Card[] = [];

  constructor(
    private snackbar: MatSnackBar,
    private translate: TranslateService
  ) {
    this.existingCartItems = JSON.parse(localStorage.getItem('card'));
    if (!this.existingCartItems) {
      this.existingCartItems = [];
    }
    this.itemsSubject.next(this.existingCartItems);
  }

  addToCart(card: Card) {
    if (this.existingCartItems.find((c) => c.id === card.id)) {
      this.snackbar.open(
        `${this.translate.instant('Card')}: ${
          card.name
        } ${this.translate.instant('already in your desk')}`,
        this.translate.instant('Close'),
        {
          panelClass: ['snackbar-fail'],
        }
      );
      return;
    }
    this.items$
      .pipe(
        take(1),
        map((cards) => {
          cards.push(card);
          localStorage.setItem('card', JSON.stringify(cards));
          this.snackbar.open(
            `${this.translate.instant('Card')}: ${
              card.name
            } ${this.translate.instant('added to your desk')}`,
            this.translate.instant('Close')
          );
        })
      )
      .subscribe();
  }

  cleanCart() {
    let existingCartItems = JSON.parse(localStorage.getItem('card'));
    if (existingCartItems) {
      localStorage.removeItem('card');
      this.itemsSubject.next([]);
      this.snackbar.open(
        this.translate.instant('Your desk is clean'),
        this.translate.instant('Close')
      );
    }
  }

  removeItem(id: string) {
    const index = this.existingCartItems.findIndex((item) => item.id === id);
    this.existingCartItems.splice(index, 1);
    localStorage.setItem('card', JSON.stringify(this.existingCartItems));
  }
}
