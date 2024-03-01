import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError, Observable, of, tap, concatMap, mergeMap, switchMap, catchError, shareReplay } from 'rxjs';
import { Supplier } from './supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  suppliersUrl = 'api/suppliers';

  constructor(private http: HttpClient) { 
    // this.suppliersWithConcatMap$.subscribe(data => console.log('concatination result of concat map', data));
    // this.suppliersWithMergeMap$.subscribe(data => console.log('concatination result of merge map', data));
    // this.suppliersWithSwitchMap$.subscribe(data => console.log('concatination result of switch map', data));
  }

  suppliers$ = this.http.get<Supplier[]>(this.suppliersUrl)
    .pipe(
      tap(data => console.log('Suppliers: ', JSON.stringify(data))),
      shareReplay(1),
      catchError(this.handleError)
    );

  suppliersWithConcatMap$ = of(1, 2, 5)
  .pipe(
    tap(id => console.log('concat map: - Supplier id', id)),
    concatMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
  );

  suppliersWithMergeMap$ = of(1, 2, 5)
  .pipe(
    tap(id => console.log('merge map: - Supplier id', id)),
    mergeMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
  );

  suppliersWithSwitchMap$ = of(1, 2, 5)
  .pipe(
    tap(id => console.log('switch map: - Supplier id', id)),
    switchMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
  );

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }

}
