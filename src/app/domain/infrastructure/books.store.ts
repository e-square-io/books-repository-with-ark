import { Injectable } from "@angular/core";
import { Ark, mixinWithStatus, withStoreConfiguration } from '@e-square/ark';
import { PageEvent } from '@angular/material/paginator';

import { Book } from "../entitties";

export interface BooksState {
  books: Book[];
  page: PageEvent;
  q: string | null;
}

function createInitialState(): BooksState {
  return {
    books: [],
    page: { pageIndex: 0, pageSize: 5, length: 0 },
    q: null,
  };
}

const BooksStoreBase = mixinWithStatus<BooksState>(Ark<BooksState>);

@Injectable()
export class BooksStore extends BooksStoreBase {
  constructor() {
    super(createInitialState(), withStoreConfiguration({ name: 'Books Store' }));
  }
}
