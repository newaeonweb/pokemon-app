import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { HttpApiResponse, PokemonService } from '@app/@pages/home/pokemon.service';
import { forkJoin, Observable } from 'rxjs';
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
  isRecordsFound = false;
  page: number;
  pageSize: number;
  totalCount: number;
  filters = {
    types: '',
    subtypes: '',
    supertypes: '',
  };
  typesList: Observable<string[]>;
  subtypesList: Observable<string[]>;
  supertypesList: Observable<string[]>;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadData();

    this.loadFilters()
      .pipe(
        tap((result) => {
          this.typesList = result[0].data;
          this.subtypesList = result[1].data;
          this.supertypesList = result[2].data;
          console.log(result);
        })
      )
      // tslint:disable-next-line: deprecation
      .subscribe();
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

  loadFilters(): Observable<any> {
    const typesList = this.pokemonService.getTypes();
    const subtypesList = this.pokemonService.getSubtypes();
    const supertypesList = this.pokemonService.getSupetypes();

    return forkJoin([typesList, subtypesList, supertypesList]);
  }

  applyFilterTypes() {}

  applyFilterSubtypes() {}

  applyFilterSupertypes() {}

  applyAllFilters() {
    this.isLoading = true;
    const { supertypes, types, subtypes } = this.filters;

    // tslint:disable-next-line: max-line-length
    this.cards$ = this.pokemonService.getWithFilters({ supertypes, types, subtypes }).pipe(
      finalize(() => (this.isLoading = false)),
      tap((response: HttpApiResponse) => {
        if (response?.data?.length === 0 || response?.data === undefined) {
          this.isRecordsFound = true;
          return;
        }
        this.isRecordsFound = false;
        this.page = response.page;
        this.pageSize = response.pageSize;
        this.totalCount = response.totalCount;
      }),
      map((response) => response.data)
    );
  }
}
