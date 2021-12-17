import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { withCache } from '@ngneat/cashew';
import { environment } from '@env/environment';

const API_URL = environment.serverUrl;

export interface QueryParams {
  query?: any;
  page: number;
  pageSize: number;
  orderBy: string;
}

export interface FilterParams {
  types?: string;
  subtypes?: string;
  supertypes?: string;
}

export interface HttpApiResponse {
  page: number;
  pageSize: number;
  totalCount: number;
  data: any;
}

export interface FilterRequest {
  data: string[];
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private httpClient: HttpClient) {}

  getCards(req: QueryParams): Observable<HttpApiResponse> {
    // let params = new HttpParams();
    // const queryIsEmpty = req?.query;

    // if (queryIsEmpty === undefined) {
    //   params = params.append('page', req.page?.toString());
    //   params = params.append('pageSize', req.pageSize?.toString());
    //   params = params.append('orderBy', req.orderBy);
    // } else {
    //   params = params.append('q', req.query);
    //   params = params.append('page', req.page?.toString());
    //   params = params.append('pageSize', req.pageSize?.toString());
    //   params = params.append('orderBy', req.orderBy);
    // }

    // Simplify request
    const params = new HttpParams({
      fromString: `${req.query ? 'q=' + req.query : ''}&page=${req.page}&pageSize=${req.pageSize}&orderBy=${
        req.orderBy
      }`,
    });

    return this.httpClient
      .get<HttpApiResponse>(`${API_URL}/cards`, { params })
      .pipe(catchError((err) => this.handleError(err)));
  }

  getTypes(): Observable<string | FilterRequest> {
    return this.httpClient
      .get<FilterRequest>(`${API_URL}/types`, { context: withCache() })
      .pipe(catchError(() => of('Error, could not load cards :-(')));
  }

  getSubtypes(): Observable<string | FilterRequest> {
    return this.httpClient
      .get<FilterRequest>(`${API_URL}/subtypes`, { context: withCache() })
      .pipe(catchError(() => of('Error, could not load cards :-(')));
  }

  getSupetypes(): Observable<string | FilterRequest> {
    return this.httpClient
      .get<FilterRequest>(`${API_URL}/supertypes`, { context: withCache() })
      .pipe(catchError(() => of('Error, could not load cards :-(')));
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
