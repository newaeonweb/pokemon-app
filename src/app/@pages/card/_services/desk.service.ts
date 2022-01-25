import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeskService {
  private itemsSubject = new BehaviorSubject<any[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor() {
    let existingCartItems = JSON.parse(localStorage.getItem('products'));
    if (!existingCartItems) {
      existingCartItems = [];
    }
    this.itemsSubject.next(existingCartItems);
  }

  addToCart(card: any) {
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
}
