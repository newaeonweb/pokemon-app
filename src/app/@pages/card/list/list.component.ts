import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '@env/environment';
import { FilterRequest, HttpApiResponse, PokemonService } from '../_services/pokemon.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

const API_URL = environment.serverUrl;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  characters$: Observable<any>;
  characterDataSource: MatTableDataSource<any[]>;
  characterDatabase = new HttpDatabase(this.httpClient);
  searchTerm$ = new BehaviorSubject<any>('');
  resultsEmpty$ = new BehaviorSubject<boolean>(false);
  resultsLength = 0;

  filterFormGroup: FormGroup;
  searchField = new FormControl('');
  queryParams: Params;

  supertypeValueFormControl = new FormControl('');
  typesValueFormControl = new FormControl('');
  subtypesIdValueFormControl = new FormControl('');

  public filterValues = {
    supertype: '',
    types: '',
    subtypes: '',
  };

  typesList: Observable<string[]>;
  subtypesList: Observable<string[]>;
  supertypesList: Observable<string[]>;

  activatedRoute: ActivatedRoute;

  constructor(
    private httpClient: HttpClient,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.filterFormGroup = this.fb.group({});

    // this.characters$ = this.route.queryParams.pipe(
    //   switchMap((params) => {
    //     this.queryParams = {
    //       page: params.page || 1,
    //       pageSize: params.pageSize || 20,
    //       orderBy: params.orderBy || 'name',
    //       q: params.q || '',
    //     };
    //     return this.loadData();
    //   })
    // );

    this.route.queryParams
      .pipe(
        tap((params) => {
          this.queryParams = {
            page: params.page || 1,
            pageSize: params.pageSize || 20,
            orderBy: params.orderBy || 'name',
            q: params.q || '',
          };
          console.log('query params', this.queryParams);
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      console.log(this.paginator.pageIndex);
      this.queryParams.page = this.paginator.pageIndex + 1;
      console.log('query', this.queryParams);
      // this.characters$ = this.loadData();

      this.characters$ = of(null);
      this.characterDatabase.getList(this.queryParams).subscribe((response: HttpApiResponse) => {
        this.characterDataSource = new MatTableDataSource(response.data as any[]);
        this.resultsLength = response.totalCount;
        // this.characterDataSource.paginator = this.paginator;
        this.characters$ = this.characterDataSource.connect();
        this.updateUrlQueryParams();
      });
    });
  }

  ngOnInit() {
    this.filterFormGroup = this.fb.group({});
    this.searchListening();
    this.loadFilters()
      .pipe(
        tap((result: FilterRequest) => {
          this.typesList = result[0].data;
          this.subtypesList = result[1].data;
          this.supertypesList = result[2].data;
        })
      )
      .subscribe();

    // this.characterDatabase
    //   .search(this.searchTerm$)
    //   .subscribe((response: HttpApiResponse) => {
    //
    //     this.resultsEmpty$.next(false);
    //     this.resultsLength = response.totalCount;
    //     this.characterDataSource = new MatTableDataSource(
    //       response.data as any[]
    //     );
    //     this.characterDataSource.paginator = this.paginator;
    //     this.characters$ = this.characterDataSource.connect();
    //   });

    this.getData();
  }

  ngOnDestroy() {
    if (this.characterDataSource) {
      this.characterDataSource.disconnect();
    }
  }

  updateUrlQueryParams() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.queryParams,
      queryParamsHandling: 'merge',
    });
    this.searchField.setValue(this.queryParams.q);
  }

  loadFilters(): Observable<{}> {
    const typesList = this.pokemonService.getTypes();
    const subtypesList = this.pokemonService.getSubtypes();
    const supertypesList = this.pokemonService.getSupetypes();

    return forkJoin([typesList, subtypesList, supertypesList]);
  }

  searchListening() {
    this.supertypeValueFormControl.valueChanges.subscribe((supertype) => {
      console.log(supertype);
      this.filterValues.supertype = supertype;
      this.characterDataSource.filter = JSON.stringify(this.filterValues);
      if (this.characterDataSource.paginator) {
        this.characterDataSource.paginator.firstPage();
      }
    });

    this.typesValueFormControl.valueChanges.subscribe((types) => {
      this.filterValues.types = types;
      this.characterDataSource.filter = JSON.stringify(this.filterValues);
    });

    this.subtypesIdValueFormControl.valueChanges.subscribe((subtypes) => {
      this.filterValues.subtypes = subtypes;
      this.characterDataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  getData() {
    this.characterDatabase.search(this.searchTerm$).subscribe((response: HttpApiResponse) => {
      console.log(response);
      this.resultsEmpty$.next(false);
      this.resultsLength = response.totalCount;
      this.characterDataSource = new MatTableDataSource(response.data as any[]);
      this.characterDataSource.paginator = this.paginator;
      this.characters$ = this.characterDataSource.connect();

      this.updateUrlQueryParams();
    });
  }

  dispatchSearch(value: any) {
    this.queryParams.q = value;
    this.characters$ = of(null);
    this.updateUrlQueryParams();
    this.searchTerm$.next(this.queryParams);
  }

  clearSearch() {
    this.searchField.setValue('');
    this.characters$ = of(null);
    this.searchTerm$.next('');
    this.queryParams.q = '';
  }

  loadData() {
    return this.characterDatabase.getCharactersList(this.queryParams).pipe(
      map((result) => {
        console.log(result);
        this.resultsLength = result.totalCount;
        this.characterDataSource = new MatTableDataSource(result.data as any[]);
        // this.characters$ = this.characterDataSource.connect();

        this.updateUrlQueryParams();
        return result.data;
      })
    );
  }
}

export class HttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  search(terms: Observable<any>) {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term) => {
        return this.getList(term).pipe(
          catchError(() => {
            return of({ data: null });
          })
        );
      })
    );
  }

  buildParams(params: any) {
    console.log(params);
    if (params !== '') {
      return `${params.q}`;
    } else {
      return `${params}`;
    }
  }

  getList(params: any): Observable<HttpApiResponse> {
    console.log(params);

    const apiUrl = `${API_URL}/cards`;
    return this._httpClient.get<HttpApiResponse>(apiUrl, {
      params: new HttpParams()
        .set('page', +params.page || 1)
        .set('pageSize', params.pageSize || 20)
        .set('orderBy', params.orderBy || 'name')
        .set('q', params.q ? `name:${params.q}` : ''),
    });
  }

  getCharactersList(params: Params): Observable<HttpApiResponse> {
    const apiUrl = `${API_URL}/cards`;
    return this._httpClient.get<HttpApiResponse>(apiUrl, {
      params: new HttpParams()
        .set('page', +params.page)
        .set('pageSize', params.pageSize)
        .set('orderBy', params.orderBy)
        .set('q', params.q),
    });
  }

  getCharacters(
    page: number = 0,
    pageSize: number = 10,
    orderBy: string = 'name',
    q: string = ''
  ): Observable<HttpApiResponse> {
    const apiUrl = `${API_URL}/cards`;
    return this._httpClient.get<HttpApiResponse>(apiUrl, {
      params: new HttpParams()
        .set('page', (page + 1).toString())
        .set('pageSize', pageSize)
        .set('orderBy', orderBy)
        .set('q', q),
    });
  }
}
