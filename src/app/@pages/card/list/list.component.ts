import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
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
  setIdValueFormControl = new FormControl('');

  public filterValues = {
    supertype: '',
    types: '',
    subtypes: '',
  };

  typesList: Observable<string[]>;
  subtypesList: Observable<string[]>;
  supertypesList: Observable<string[]>;
  setList: Observable<string[]>;

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

    this.characters$ = this.route.queryParams.pipe(
      switchMap((params) => {
        this.queryParams = {
          page: params.page || 1,
          pageSize: params.pageSize || 4,
          orderBy: params.orderBy || 'name',
          q: params.q || '',
        };
        console.log('switchMap', this.queryParams);

        return this.loadData();
      })
    );
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      console.log(this.paginator);
      this.queryParams.page = this.paginator.pageIndex + 1;
      this.queryParams.pageSize = this.paginator.pageSize;

      console.log('query', this.queryParams);

      this.characters$ = this.loadData();
      this.updateUrlQueryParams();
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
          this.setList = result[3].data;
        })
      )
      .subscribe();
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
  }

  loadFilters(): Observable<{}> {
    const typesList = this.pokemonService.getTypes();
    const subtypesList = this.pokemonService.getSubtypes();
    const supertypesList = this.pokemonService.getSupetypes();
    const setList = this.pokemonService.getSets();

    return forkJoin([typesList, subtypesList, supertypesList, setList]);
  }

  searchListening() {
    this.supertypeValueFormControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        switchMap(() => {
          this.characters$ = of(null);
          return this.characterDatabase
            .getAll({
              page: 1,
              pageSize: 20,
              orderBy: 'name',
              q: this.supertypeValueFormControl.value !== '' ? `supertype:${this.supertypeValueFormControl.value}` : '',
            })
            .pipe(
              map((res: any) => {
                this.resultsLength = res.totalCount;
                this.queryParams.pageSize = res.pageSize;
                this.characters$ = of(res.data);
              })
            );
        })
      )
      .subscribe();

    // this.supertypeValueFormControl.valueChanges
    //   .pipe(
    //     // debounceTime(400),
    //     distinctUntilChanged(),
    //     map((supertype) => {
    //       if (supertype === '') {
    //         this.queryParams.q = '';
    //         return;
    //       }
    //       this.queryParams.q = `supertype:${supertype}`;
    //     }),
    //     switchMap(() => {
    //       return this.characterDatabase.getCharactersList(this.queryParams).pipe(
    //         map((result) => {
    //           this.resultsLength = result.totalCount;
    //           this.queryParams.pageSize = result.pageSize;
    //           this.characters$ = of(result.data);
    //         }),
    //         catchError(() => {
    //           return of({ data: null });
    //         })
    //       );
    //     })
    //   )
    //   .subscribe();

    this.typesValueFormControl.valueChanges.subscribe((types) => {
      this.filterValues.subtypes = types;
      this.characterDataSource.filter = JSON.stringify(this.filterValues);
      console.log(this.characterDataSource.filter);
    });

    this.subtypesIdValueFormControl.valueChanges.subscribe((subtypes) => {
      this.filterValues.subtypes = subtypes;
      this.characterDataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  dispatchSearch(value: any) {
    this.queryParams.page = 1;
    this.queryParams.q = `name:${value}`;
    // this.characters$ = of(null);
    this.updateUrlQueryParams();
    console.log('params on search', this.queryParams);

    this.searchTerm$.next(this.queryParams);
  }

  clearSearch() {
    this.searchField.setValue('');
    // this.characters$ = of(null);
    // this.searchTerm$.next('');
    this.queryParams.q = '';
    this.updateUrlQueryParams();
  }

  resetPagination() {
    this.queryParams.page = 1;
    this.updateUrlQueryParams();
  }

  loadData() {
    return this.characterDatabase.getCharactersList(this.queryParams).pipe(
      map((result) => {
        console.log(result);
        this.resultsLength = result.totalCount;
        this.characterDataSource = new MatTableDataSource(result.data as any[]);
        console.log(this.characterDataSource.data);
        // this.characterDataSource.paginator = this.paginator;
        // this.characters$ = this.characterDataSource.connect();
        // this.updateUrlQueryParams();
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

  getAll(param?: any): Observable<any[]> {
    let params = new HttpParams();

    Object.keys(param).forEach((item) => {
      params = params.set(item, param[item]);
    });

    const apiUrl = `${API_URL}/cards`;
    return this._httpClient.get(apiUrl, { params }).pipe(
      map((res: any) => res),
      catchError((err: HttpErrorResponse) => {
        return of(null);
      })
    );
  }
}
