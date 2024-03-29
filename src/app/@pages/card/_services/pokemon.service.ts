import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { withCache } from '@ngneat/cashew';
import { environment } from '@env/environment';
import { Params } from '@angular/router';
import { HttpApiResponse } from '../_interfaces/http-api-response.interface';
import { QueryParams } from '../_interfaces/query-params.interface';

const API_URL = environment.serverUrl;

export interface FilterRequest {
  data: string[];
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private httpClient: HttpClient) {}

  getCards(req: QueryParams): Observable<HttpApiResponse> {
    const params = new HttpParams({
      fromString: `${req.query ? 'q=' + req.query : ''}&page=${
        req.page
      }&pageSize=${req.pageSize}&orderBy=${req.orderBy}`,
    });

    return this.httpClient
      .get<HttpApiResponse>(`${API_URL}/cards`, { params })
      .pipe(catchError((err) => this.handleError(err)));
  }

  getListFilters(type: string): Observable<string | FilterRequest> {
    return this.httpClient
      .get<FilterRequest>(`${API_URL}/${type}`, { context: withCache() })
      .pipe(catchError((err) => this.handleError(err)));
  }

  getCardsList(params: Params): Observable<HttpApiResponse> {
    const apiUrl = `${API_URL}/cards`;
    return this.httpClient
      .get<HttpApiResponse>(apiUrl, {
        params: new HttpParams()
          .set('page', +params.page)
          .set('pageSize', params.pageSize)
          .set('orderBy', params.orderBy)
          .set('q', params.q),
      })
      .pipe(catchError((err) => this.handleError(err)));
  }

  getAll(param?: any): Observable<any[]> {
    let params = new HttpParams();

    Object.keys(param).forEach((item) => {
      params = params.set(item, param[item]);
    });

    const apiUrl = `${API_URL}/cards`;
    return this.httpClient.get(apiUrl, { params }).pipe(
      map((res: any) => res),
      catchError((err) => this.handleError(err))
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // console.error('An ErrorEvent error occurred:', error.error.message);
    } else {
      // console.error('An HttpErrorResponse error occurred:', error.message);
      // backend error 404...
      return throwError(() => error);
    }
    return throwError(
      () => 'Ohps something wrong happen here; please try again later.'
    );
  }
}
