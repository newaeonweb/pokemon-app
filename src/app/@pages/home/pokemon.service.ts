import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  card: (req: QueryParams) =>
    // tslint:disable-next-line: max-line-length
    `https://api.pokemontcg.io/v2/cards?q=${req.query}&page=${req.page}&pageSize=${req.pageSize}&orderBy=${req.orderBy}`,
};

export interface QueryParams {
  query?: string;
  page?: number;
  pageSize?: number;
  orderBy?: string;
}

export interface HttpApiResponse {
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
    return this.httpClient.get(routes.card(req)).pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load cards :-('))
    );
  }
}
