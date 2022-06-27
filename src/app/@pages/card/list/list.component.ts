import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, forkJoin, Observable, of, Subscription } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { FilterRequest, PokemonService } from '../_services/pokemon.service';

import { Logger } from '@core/logger.service';
import { MatDrawer } from '@angular/material/sidenav';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DeskService } from '../_services/desk.service';
import { Card } from '../_interfaces/card.interface';
import { TranslateService } from '@ngx-translate/core';

const log = new Logger('card list');

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('drawer') drawer: MatDrawer;
  @ViewChild('toTop') toTop: ElementRef;
  subscription = new Subscription();

  characters$: Observable<any[]>;
  searchTerm$ = new BehaviorSubject<any>('');
  resultsLength = 0;
  queryParams: Params;
  formFilter: FormGroup;
  searchListText = '';
  emptyResult = false;

  typesList: string[];
  subtypesList: string[];
  supertypesList: string[];
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
    private translate: TranslateService
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

          this.formFilter.setValue({
            searchField: query.name || '',
            supertype: query.supertype || '',
            types: query.types || '',
            subtypes: query.subtypes || '',
            set: query['set.name'] || '',
          });
        }

        return this.getCards();
      }),
      take(1),
      shareReplay(1)
    );
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.queryParams.page = this.paginator.pageIndex + 1;
      this.queryParams.pageSize = this.paginator.pageSize;
      this.characters$ = this.getCards();
      this.updateUrlQueryParams();
      this.toTop.nativeElement.scrollIntoView({
        behavior: 'smooth',
      });
    });
  }

  ngOnInit() {
    this.createForm();
    this.searchListening();
    this.subscription = this.loadFilters()
      .pipe(
        tap((result: FilterRequest) => {
          this.typesList = result[0].data;
          this.subtypesList = result[1].data;
          this.supertypesList = result[2].data;
          this.setList = result[3].data.sort(
            (a: { name: number }, b: { name: number }) =>
              (a.name > b.name && 1) || -1
          );
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
    return Object.fromEntries(
      Object.entries(queryStringToObj).filter(([_, value]) => value != null)
    );
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

          this.characters$ = of([]);

          this.queryParams.q = query;

          this.updateUrlQueryParams();

          return this.getCards();
        }),
        shareReplay(1)
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
    this.emptyResult = false;
    this.queryParams.q = '';
    this.updateUrlQueryParams();
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
    log.info('getCards');
    return this.pokemonService.getAll(this.queryParams).pipe(
      map((res: any) => {
        if (res.data.length === 0) {
          this.emptyResult = true;
          this.characters$ = of(null);
          return;
        }
        this.emptyResult = false;
        this.resultsLength = res.totalCount;
        this.queryParams.pageSize = res.pageSize;
        this.characters$ = of(res.data);
      }),
      catchError(() => (this.characters$ = of([]))),
      shareReplay(1)
    );
  }

  showDetails(card: any) {
    this.card = card;
    this.drawer.open();
  }

  addToDesk(card: any) {
    this.confirmAddToDesk(card);
  }

  confirmAddToDesk(card: any) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: this.translate.instant('Confirm action'),
        message: `${this.translate.instant(
          'Are you sure, you want to inlude this card'
        )}: ${card?.name},
         ${this.translate.instant('to your poke-desk')}?`,
        card,
      },
    });
    confirmDialog.afterClosed().subscribe((item) => {
      if (item === false) {
        return;
      }
      this.deskService.addToCart(item);
    });
  }
}
