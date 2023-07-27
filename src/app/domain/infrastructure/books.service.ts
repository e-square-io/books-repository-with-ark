import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, tap, firstValueFrom, catchError, EMPTY } from 'rxjs';

import { BooksResponse, mapBooksResItemToBook } from '../entitties';
import { BooksState, BooksStore } from './books.store';

const GOOGLE_APIS = 'https://www.googleapis.com/books/v1';

@Injectable()
export class BooksService {
  private readonly http = inject(HttpClient);
  private readonly store = inject(BooksStore);

  readBooks(q: string, startIndex = 0, maxResults = 10): void {
    const params = new HttpParams({ fromObject: { q, startIndex, maxResults } });
    this.store.setStatus('busy');

    firstValueFrom(this.http.get<BooksResponse>(`${GOOGLE_APIS}/volumes`, { params })
      .pipe(
        map<BooksResponse, BooksState>(({ items, totalItems }) => 
          ({
            books: items.map(mapBooksResItemToBook), 
            page: { length: totalItems, pageIndex: startIndex / maxResults, pageSize: maxResults }, 
            q 
          })
        ),
        tap(state => {
          this.store.update(state);
          this.store.setStatus('idle');
        }),
      )).catch(error => {
        this.store.setError({
          message: error.message,
        });
      });
  }
}
