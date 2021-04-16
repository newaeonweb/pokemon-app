import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { withCache } from '@ngneat/cashew';

const API_URL = 'https://api.pokemontcg.io/v2';

export interface QueryParams {
  query?: string;
  page?: number;
  pageSize?: number;
  orderBy?: string;
}

export interface FilterParams extends QueryParams {
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
    let params = new HttpParams();
    const queryIsEmpty = Object.values(req).every((q) => q === null || q === '');

    if (queryIsEmpty) {
      params = params.append('page', '1');
      params = params.append('pageSize', '10');
      params = params.append('orderBy', 'name');
    } else {
      params.set('q', req.query);
      params = params.append('page', req.page?.toString());
      params = params.append('pageSize', req.pageSize?.toString());
      params = params.append('orderBy', req.orderBy);
    }

    return this.httpClient.get(`${API_URL}/cards`, { params }).pipe(
      map((body: any) => body),
      catchError((err) => this.handleError(err))
    );
  }

  getTypes(): Observable<string[]> {
    return this.httpClient.get(`${API_URL}/types`, withCache()).pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load cards :-('))
    );
  }

  getSubtypes(): Observable<any> {
    return this.httpClient.get(`${API_URL}/subtypes`, withCache()).pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load cards :-('))
    );
  }

  getSupetypes(): Observable<any> {
    return this.httpClient.get(`${API_URL}/supertypes`, withCache()).pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load cards :-('))
    );
  }

  getWithFilters(req: QueryParams): Observable<any> {
    console.log('🚀 - : PokemonService -> constructor -> req', req);
    const isEmpty = Object.values(req).every((x) => x === null || x === '');

    let params = new HttpParams();
    params = params.set('q', req.query);
    params = params.append('page', req.page.toString());
    params = params.append('pageSize', req.pageSize.toString());
    params = params.append('orderBy', req.orderBy);

    return this.httpClient.get(`https://api.pokemontcg.io/v2/cards`, { params }).pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load cards :-('))
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // console.error('An ErrorEvent error occurred:', error.error.message);
    } else {
      // console.error('An HttpErrorResponse error occurred:', error.message);
      // backend error 404...
      return throwError(error);
    }
    return throwError('Ohps something wrong happen here; please try again later.');
  }
}
