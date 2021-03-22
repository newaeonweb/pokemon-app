import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { HttpApiResponse, PokemonService } from '@app/@pages/home/pokemon.service';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit, AfterViewInit {
  @ViewChild('paginator') paginator: MatPaginator;
  cards$: Observable<any>;
  isLoading = false;
  page: number;
  pageSize: number;
  totalCount: number;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.loadData('', this.paginator.pageIndex + 1, this.paginator.pageSize, 'name');
    });
  }

  loadData(q: string = '', p: number = 1, s: number = 10, o: string = 'name') {
    this.isLoading = true;
    this.cards$ = this.pokemonService.getCards({ query: q, page: p, pageSize: s, orderBy: o }).pipe(
      finalize(() => (this.isLoading = false)),
      tap((response: HttpApiResponse) => {
        this.page = response.page;
        this.pageSize = response.pageSize;
        this.totalCount = response.totalCount;
      }),
      map((response) => response.data)
    );
  }
}
