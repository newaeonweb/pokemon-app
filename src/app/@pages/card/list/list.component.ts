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
  searchTerm$ = new BehaviorSubject<string>('');
  resultsEmpty$ = new BehaviorSubject<boolean>(false);
  status = '';
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

    this.characters$ = this.route.queryParams.pipe(
      switchMap((params) => {
        this.queryParams = {
          page: params.page || 1,
          pageSize: params.pageSize || 20,
          orderBy: params.orderBy || 'name',
          q: params.q || '',
        };
        return this.loadData();
      })
    );
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      console.log(this.paginator.pageIndex);
      this.queryParams.page = this.paginator.pageIndex + 1;
      console.log('query', this.queryParams);
      this.characters$ = this.loadData();
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

    return forkJoin([typesList, subtypesList, supertypesList]);
  }

  searchListening() {
    this.supertypeValueFormControl.valueChanges.subscribe((supertype) => {
      this.filterValues.supertype = supertype;
      this.characterDataSource.filter = JSON.stringify(this.filterValues);
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

  applyFilter() {
    const filterValue = this.status;
    this.characterDataSource.filter = filterValue.trim().toLowerCase();
    this.characterDataSource.paginator = this.paginator;
    if (this.characterDataSource.paginator) {
      this.characterDataSource.paginator.firstPage();
    }
  }
}

export class HttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  search(terms: Observable<any>) {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term) =>
        this.getCharacters(0, 10, 'name', term ? `name:${term}` : '').pipe(
          catchError(() => {
            return of({ info: null, results: null });
          })
        )
      )
    );
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
