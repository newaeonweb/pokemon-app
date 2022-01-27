import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { Card } from '../_interfaces/card.interface';

@Injectable({
  providedIn: 'root',
})
export class DeskService {
  private itemsSubject = new BehaviorSubject<Card[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor() {
    let existingCartItems = JSON.parse(localStorage.getItem('card'));
    if (!existingCartItems) {
      existingCartItems = [];
    }
    this.itemsSubject.next(existingCartItems);
  }

  addToCart(card: Card) {
    this.items$
      .pipe(
        take(1),
        map((cards) => {
          cards.push(card);
          localStorage.setItem('card', JSON.stringify(cards));
        })
      )
      .subscribe();
  }

  cleanCart() {
    let existingCartItems = JSON.parse(localStorage.getItem('card'));
    if (existingCartItems) {
      localStorage.removeItem('card');
      this.itemsSubject.next([]);
    }
  }
}
