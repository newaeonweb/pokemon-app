import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, share } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isLoading$ = new BehaviorSubject<boolean>(false);

  show() {
    this.isLoading$.next(true);
  }

  hide() {
    this.isLoading$.next(false);
  }

  isVisible(): Observable<boolean> {
    return this.isLoading$.asObservable().pipe(share());
  }

  constructor() {}
}
