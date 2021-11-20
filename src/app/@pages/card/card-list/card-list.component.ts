import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  HttpApiResponse,
  PokemonService,
  ApiQueryParams,
  FilterRequest,
} from '@app/@pages/card/_services/pokemon.service';
import { forkJoin, Observable } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit, AfterViewInit {
  @ViewChild('paginator') paginator: MatPaginator;
  cards$: Observable<HttpApiResponse>;
  isLoading = false;
  isRecordsFound = false;
  isError: boolean;
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

  activatedRoute: ActivatedRoute;
  request: ApiQueryParams = {
    page: 1,
    pageSize: 10,
    orderBy: 'name',
  };

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute, private router: Router) {}

  // Declare lifecycle methods first
  ngOnInit() {
    this.buildPaginationRequest();
    this.loadData(this.request);
    this.loadFilters()
      .pipe(
        tap((result: FilterRequest) => {
          this.typesList = result[0].data;
          this.subtypesList = result[1].data;
          this.supertypesList = result[2].data;
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.request.page = this.paginator.pageIndex + 1;
      this.request.pageSize = this.paginator.pageSize;
      this.request.orderBy = 'name';
      // Update url query params
      this.updateUrlParams(this.request);
      this.loadData(this.request);
    });
  }

  buildPaginationRequest() {
    this.route.queryParams.subscribe((param: Params) => {
      this.activatedRoute = this.route.parent;
      this.request = { ...this.request, ...param };
    });
  }

  updateUrlParams(request: ApiQueryParams) {
    return this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: request,
      queryParamsHandling: 'merge',
    });
  }

  loadData(request?: ApiQueryParams) {
    this.isLoading = true;

    this.cards$ = this.pokemonService.getCards(request).pipe(
      catchError(async (err) => {
        this.isError = err.message;
      }),
      finalize(() => (this.isLoading = false)),
      tap((response: HttpApiResponse) => {
        if (response?.data.length === 0 || response?.data === undefined) {
          this.isRecordsFound = true;
          return;
        }
        this.isRecordsFound = false;
        this.isError = false;
        this.page = response.page;
        this.pageSize = response.pageSize;
        this.totalCount = response.totalCount;
      }),
      map((response: HttpApiResponse) => response?.data)
    );
  }

  loadFilters(): Observable<{}> {
    const typesList = this.pokemonService.getTypes();
    const subtypesList = this.pokemonService.getSubtypes();
    const supertypesList = this.pokemonService.getSupetypes();

    return forkJoin([typesList, subtypesList, supertypesList]);
  }

  applyAllFilters() {
    let { supertypes, types, subtypes } = this.filters;
    let query: string;

    if (!supertypes && !types && !subtypes) return;

    if (supertypes) {
      query = `supertype:${supertypes}`;
    }
    if (supertypes && types) {
      query = `supertype:${supertypes} types:${types}`;
    }
    if (supertypes && types && subtypes) {
      query = `supertype:${supertypes} types:${types} subtypes:${subtypes}`;
    }

    this.request = Object.assign(this.request, { query: query, page: 1 });
    this.loadData(this.request);
    // this.updateUrlParams(this.request);
  }

  clearFilters() {
    // Clear obj values
    Object.keys(this.filters).forEach((i) => (this.filters[i] = ''));
    Object.keys(this.request).forEach((i) => (this.request[i] = ''));
    this.request.page = 1;
    this.request.pageSize = 10;
    this.request.orderBy = 'name';

    this.updateUrlParams(this.request);
    this.loadData(this.request);
  }
}
