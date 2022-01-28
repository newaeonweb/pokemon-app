import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, map, take } from 'rxjs';
import { Card } from '../_interfaces/card.interface';

@Injectable({
  providedIn: 'root',
})
export class DeskService {
  private itemsSubject = new BehaviorSubject<Card[]>([]);
  items$ = this.itemsSubject.asObservable();
  existingCartItems: Card[] = [];

  constructor(private snackbar: MatSnackBar) {
    this.existingCartItems = JSON.parse(localStorage.getItem('card'));
    if (!this.existingCartItems) {
      this.existingCartItems = [];
    }
    this.itemsSubject.next(this.existingCartItems);
  }

  addToCart(card: Card) {
    if (this.existingCartItems.find((c) => c.id === card.id)) {
      this.snackbar.open(`Card ${card.name} already in your desk`, 'Close', { panelClass: ['snackbar-fail'] });
      return;
    }
    this.items$
      .pipe(
        take(1),
        map((cards) => {
          cards.push(card);
          localStorage.setItem('card', JSON.stringify(cards));
          this.snackbar.open(`Card ${card.name} added to your desk`, 'Close', { panelClass: ['snackbar'] });
        })
      )
      .subscribe();
  }

  cleanCart() {
    let existingCartItems = JSON.parse(localStorage.getItem('card'));
    if (existingCartItems) {
      localStorage.removeItem('card');
      this.itemsSubject.next([]);
      this.snackbar.open(`Your desk is clean`, 'Close');
    }
  }
}
