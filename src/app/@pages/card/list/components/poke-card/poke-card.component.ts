import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.scss'],
})
export class PokeCardComponent {
  @Input() card: any;
  @Output() openDetail = new EventEmitter();
  @Output() addToDesk = new EventEmitter();

  showCardDetails(card: any) {
    this.openDetail.emit(card);
  }

  addToMyDesk(card: any) {
    this.addToDesk.next(card);
  }
}
