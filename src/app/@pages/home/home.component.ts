import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cards$: Observable<any>;
  isLoading = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    // this.isLoading = true;
    // this.cards$ = this.pokemonService.getCards({ query: '', page: '1', pageSize: '10', orderBy: 'name' }).pipe(
    //   finalize(() => {
    //     this.isLoading = false;
    //   })
    // );
  }
}
