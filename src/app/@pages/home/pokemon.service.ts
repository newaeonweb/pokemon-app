import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { withCache } from '@ngneat/cashew';

const routes = {
  card: (req: QueryParams) =>
    // tslint:disable-next-line: max-line-length
    `https://api.pokemontcg.io/v2/cards?q=${req.query}&page=${req.page}&pageSize=${req.pageSize}&orderBy=${req.orderBy}`,
  types: () => `https://api.pokemontcg.io/v2/types`,
  subtypes: () => `https://api.pokemontcg.io/v2/subtypes`,
  supertypes: () => `https://api.pokemontcg.io/v2/supertypes`,
  withFilters: (req: FilterParams) =>
    `https://api.pokemontcg.io/v2/cards?q=supertype:${req.supertypes} types:${req.types} subtypes:${req.subtypes}`,
};

export interface QueryParams {
  query?: string;
  page?: number;
  pageSize?: number;
  orderBy?: string;
}

export interface FilterParams {
  types?: string;
  subtypes?: string;
  supertypes?: string;
}

export interface HttpApiResponse {
  length: any;
  count: number;
  page: number;
  pageSize: number;
  totalCount: number;
  data: any[];
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private httpClient: HttpClient) {}

  getCards(req: QueryParams): Observable<any> {
    return this.httpClient.get(routes.card(req), withCache()).pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load cards :-('))
    );
  }

  getTypes(): Observable<string[]> {
    return this.httpClient.get(routes.types(), withCache()).pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load cards :-('))
    );
  }

  getSubtypes(): Observable<any> {
    return this.httpClient.get(routes.subtypes(), withCache()).pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load cards :-('))
    );
  }

  getSupetypes(): Observable<any> {
    return this.httpClient.get(routes.supertypes(), withCache()).pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load cards :-('))
    );
  }

  getWithFilters(req: FilterParams): Observable<any> {
    const Filters = (obj: {}) => {
      for (const propName in obj) {
        if (obj[propName] === '' || obj[propName] === undefined) {
          delete obj[propName];
        }
      }
      return obj;
    };

    const filteredParams = Filters(req);

    return this.httpClient.get(routes.withFilters(filteredParams)).pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load cards :-('))
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error('An error occurred:', error.message);
      return throwError(error);
    }
    return throwError('Ohps something wrong happen here; please try again later.');
  }
}
