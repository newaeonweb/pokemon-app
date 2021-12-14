import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { environment } from '@env/environment';
import { FilterRequest, HttpApiResponse, PokemonService } from '../_services/pokemon.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

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
        const filters = {
          page: params.page || 1,
          pageSize: params.pageSize || 10,
          orderBy: params.orderBy || 'name',
          q: params.q || '',
        };
        return this.characterDatabase.getCharactersList(filters).pipe(
          map((result) => {
            console.log(result);
            this.resultsLength = result.totalCount;
            this.characterDataSource = new MatTableDataSource(result.data as any[]);
            this.characters$ = this.characterDataSource.connect();
            return result.data;
          })
        );
      })
    );
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      console.log(this.paginator.pageIndex);
      this.characterDatabase.getCharacters(this.paginator.pageIndex).subscribe((response: HttpApiResponse) => {
        this.characterDataSource = new MatTableDataSource(response.data as any[]);
        this.resultsLength = response.totalCount;
        // this.characterDataSource.paginator = this.paginator;
        this.characters$ = this.characterDataSource.connect();
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParamsHandling: 'merge',
        });
      });
    });
  }

  ngOnInit() {
    this.filterFormGroup = this.fb.group({});
    // this.loadData();
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
    this.characterDatabase.search(this.searchTerm$).subscribe((response: HttpApiResponse) => {
      if (!response.data) {
        this.resultsEmpty$.next(true);
        return;
      }
      this.resultsEmpty$.next(false);
      this.resultsLength = response.totalCount;
      this.characterDataSource = new MatTableDataSource(response.data as any[]);
      // this.characterDataSource.paginator = this.paginator;
      // this.characterDataSource.filterPredicate = this.applyFilters();
      this.characters$ = this.characterDataSource.connect();
    });
  }

  applyFilters(): (data: any, filter: string) => boolean {
    const filterFunction = (data: any, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return (
        data.supertype.toLowerCase().indexOf(searchTerms.supertype.toLowerCase()) !== -1 &&
        data.types.indexOf(searchTerms.types) !== -1 &&
        data.subtypes.toString().toLowerCase().indexOf(searchTerms.subtypes.toString().toLowerCase()) !== -1
      );
    };

    return filterFunction;
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

  getCharactersList(filters: any): Observable<HttpApiResponse> {
    const apiUrl = `${API_URL}/cards`;
    return this._httpClient.get<HttpApiResponse>(apiUrl, {
      params: new HttpParams()
        .set('page', +filters.page)
        .set('pageSize', filters.pageSize)
        .set('orderBy', filters.orderBy)
        .set('q', filters.q),
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
