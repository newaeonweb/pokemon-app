import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-poke-card-detail',
  templateUrl: './poke-card-detail.component.html',
  styleUrls: ['./poke-card-detail.component.scss'],
})
export class PokeCardDetailComponent {
  @Input() card: any;
}
