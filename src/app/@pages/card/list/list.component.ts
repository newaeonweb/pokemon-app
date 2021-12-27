import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
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
export class ListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  characters$: Observable<any>;
  searchTerm$ = new BehaviorSubject<any>('');
  resultsEmpty$ = new BehaviorSubject<boolean>(false);
  resultsLength = 0;

  searchField = new FormControl('');
  queryParams: Params;

  supertypeValueFormControl = new FormControl('');
  typesValueFormControl = new FormControl('');
  subtypesIdValueFormControl = new FormControl('');
  setIdValueFormControl = new FormControl('');

  searchListText: string;

  typesList: Observable<string[]>;
  subtypesList: Observable<string[]>;
  supertypesList: Observable<string[]>;
  setList: string[];

  activatedRoute: ActivatedRoute;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router
  ) {
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

  updateUrlQueryParams() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.queryParams,
      queryParamsHandling: 'merge',
    });
  }

  loadFilters(): Observable<{}> {
    const typesList = this.pokemonService.getListFilters('types');
    const subtypesList = this.pokemonService.getListFilters('subtypes');
    const supertypesList = this.pokemonService.getListFilters('supertypes');
    const setList = this.pokemonService.getListFilters('sets');

    return forkJoin([typesList, subtypesList, supertypesList, setList]);
  }

  searchListening() {
    this.supertypeValueFormControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        switchMap(() => {
          this.characters$ = of(null);
          this.queryParams.q =
            this.supertypeValueFormControl.value !== '' ? `supertype:${this.supertypeValueFormControl.value}` : '';
          this.updateUrlQueryParams();
          return this.pokemonService
            .getAll({
              page: 1,
              pageSize: 20,
              orderBy: 'name',
              q: this.queryParams.q,
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
      // this.filterValues.subtypes = types;
      // this.characterDataSource.filter = JSON.stringify(this.filterValues);
      // console.log(this.characterDataSource.filter);
    });

    this.subtypesIdValueFormControl.valueChanges.subscribe((subtypes) => {
      // this.filterValues.subtypes = subtypes;
      // this.characterDataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  dispatchSearch(value: any) {
    this.queryParams.page = 1;
    this.queryParams.q = `name:${value}`;
    this.updateUrlQueryParams();
    console.log('params on search', this.queryParams);

    this.searchTerm$.next(this.queryParams);
  }

  clearSearch() {
    this.searchField.setValue('');
    this.queryParams.q = '';
    this.updateUrlQueryParams();
  }

  resetPagination() {
    this.queryParams.page = 1;
    this.updateUrlQueryParams();
  }

  loadData() {
    return this.pokemonService.getCardsList(this.queryParams).pipe(
      map((result) => {
        this.resultsLength = result.totalCount;
        return result.data;
      })
    );
  }
}
