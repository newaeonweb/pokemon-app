import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from '@env/environment';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { FilterRequest, PokemonService } from '../_services/pokemon.service';

import { Logger } from '@core/logger.service';
import { MatDrawer } from '@angular/material/sidenav';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DeskService } from '../_services/desk.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from '../_interfaces/card.interface';

const log = new Logger('card list');

const API_URL = environment.serverUrl;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('drawer') drawer: MatDrawer;
  characters$: Observable<any[]>;
  searchTerm$ = new BehaviorSubject<any>('');
  resultsLength = 0;
  queryParams: Params;
  formFilter: FormGroup;
  searchListText = '';

  typesList: Observable<string[]>;
  subtypesList: Observable<string[]>;
  supertypesList: Observable<string[]>;
  setList: string[];

  activatedRoute: ActivatedRoute;
  card: Card;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router,
    private deskService: DeskService,
    private snackBar: MatSnackBar
  ) {
    this.characters$ = this.route.queryParams.pipe(
      debounceTime(300),
      switchMap((params) => {
        this.queryParams = {
          page: params.page || 1,
          pageSize: params.pageSize || 4,
          orderBy: params.orderBy || 'name',
          q: params.q || '',
        };

        if (params.q) {
          const query = this.convertQueryStringToObject();

          this.formFilter.patchValue({
            searchField: query.name || '',
            supertype: query.supertype || '',
            types: query.types || '',
            subtypes: query.subtypes || '',
            set: query['set.name'] || '',
          });
        }

        return this.getCards();
      }),
      shareReplay(1)
    );
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.queryParams.page = this.paginator.pageIndex + 1;
      this.queryParams.pageSize = this.paginator.pageSize;
      this.characters$ = this.getCards();
      this.updateUrlQueryParams();
    });
  }

  ngOnInit() {
    this.createForm();
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

  createForm() {
    this.formFilter = this.fb.group({
      searchField: [''],
      supertype: [''],
      types: [''],
      subtypes: [''],
      set: [''],
    });
  }

  convertQueryStringToObject() {
    const queryStringToObj = this.queryParams.q
      .split(' ')
      .map((value: string) => value.split(':').map((text) => text.trim()))
      .reduce((obj: { [value: string]: any }, value: any[]) => {
        obj[value[0]] = value[1];
        return obj;
      }, {});
    // remove empty properties from object
    const query = Object.fromEntries(Object.entries(queryStringToObj).filter(([_, value]) => value != null));

    return query;
  }

  updateUrlQueryParams() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.queryParams,
      queryParamsHandling: 'merge',
    });
  }

  loadFilters(): Observable<{}> {
    // Load all filter list from API as an Observable
    const typesList = this.pokemonService.getListFilters('types');
    const subtypesList = this.pokemonService.getListFilters('subtypes');
    const supertypesList = this.pokemonService.getListFilters('supertypes');
    const setList = this.pokemonService.getListFilters('sets');

    return forkJoin([typesList, subtypesList, supertypesList, setList]);
  }

  searchListening() {
    this.formFilter.valueChanges
      .pipe(
        distinctUntilChanged(),
        switchMap((filter) => {
          let query = '';

          if (filter.searchField) {
            query = query.concat('', `name:${filter.searchField}`);
          }

          if (filter.supertype) {
            query = query.concat(' ', `supertype:${filter.supertype}`);
          }

          if (filter.types) {
            query = query.concat(' ', `types:${filter.types}`);
          }

          if (filter.subtypes) {
            query = query.concat(' ', `subtypes:${filter.subtypes}`);
          }

          if (filter.set) {
            query = query.concat(' ', `set.name:${filter.set}`);
          }

          this.characters$ = of(null);

          this.queryParams.q = query;

          this.updateUrlQueryParams();

          return this.getCards();
        })
      )
      .subscribe();
  }

  clearFilters() {
    this.formFilter.patchValue({
      searchField: '',
      supertype: '',
      types: '',
      subtypes: '',
      set: '',
    });
  }

  dispatchSearch(value: any) {
    this.queryParams.page = 1;
    this.queryParams.q = `name:${value}`;
    this.updateUrlQueryParams();
    log.info('dispatchSearch', this.queryParams);
  }

  clearSearch() {
    this.formFilter.get('searchField').setValue('');
    this.queryParams.q = '';
    this.updateUrlQueryParams();
  }

  getCards(): Observable<any> {
    return this.pokemonService.getAll(this.queryParams).pipe(
      map((res: any) => {
        this.resultsLength = res.totalCount;
        this.queryParams.pageSize = res.pageSize;
        this.characters$ = of(res.data);
      }),
      catchError((err: HttpErrorResponse) => {
        log.debug('getCards error', err);
        if (err.status === 400) {
          alert('Algo estranho aconteceu');
        }
        if (err.status === 404) {
          alert('Nenhum resultado encontrado');
        }
        return (this.characters$ = of([]));
      }),
      shareReplay(1)
    );
  }

  showDetails(card: any) {
    this.card = card;
    this.drawer.open();
    document.querySelector('.mat-sidenav-content').scrollTop = 0;
  }

  addToDesk(card: any) {
    this.confirmAddToDesk(card);
  }

  confirmAddToDesk(card: any) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm add card',
        message: `Are you sure, you want to inlude this card: ${card?.name},
         to your poke-desk?`,
        card,
      },
    });
    confirmDialog.afterClosed().subscribe((card) => {
      if (card === false) {
        return;
      }
      this.deskService.addToCart(card);
    });
  }
}
