import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from '@env/environment';
import { Logger } from '@app/@core';
import { NotifyService } from '../services/snack-bar.service';

const log = new Logger('card list');

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notifyService: NotifyService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      // retry(1),
      catchError((error: HttpErrorResponse) => {
        if (!environment.production) {
          // Log available on dev mode
          log.error('Request error', error);
        }
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          return throwError(() => this.getServerErrorMessage(error));
        }
      })
    );
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    const httpStatus = error.status;
    const message = error.error.error.message;
    switch (httpStatus) {
      case HttpStatusCode.BadRequest: {
        this.notifyService.openSnackBar(`${message}`);
      }
      case HttpStatusCode.Unauthorized: {
        return `Unauthorized: put your message here`;
      }
      case HttpStatusCode.Forbidden: {
        return `Forbidden: put your message here`;
      }
      case HttpStatusCode.NotFound: {
        return `Not Found: put your message here`;
      }
      case HttpStatusCode.UnprocessableEntity: {
        return `Unprocessable Entity: put your message here`;
      }
      case HttpStatusCode.InternalServerError: {
        return `Internal Server Error: put your message here`;
      }
      default: {
        return `Unknown Server Error: put your message here`;
      }
    }
  }
}
