import { Component, Input, inject, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { BooksService, BooksStore } from '../domain';
import { BookItemComponent } from './book-item/book-item.component';
import { debounceTime } from 'rxjs';

const MAT_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
];

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BookItemComponent,
    MAT_MODULES,
  ],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {
  private readonly booksService = inject(BooksService);
  
  readonly booksStore = inject(BooksStore);

  readonly queryControl = new FormControl<string | null>(null);
  readonly $q = toSignal(this.queryControl.valueChanges.pipe(debounceTime(700)));
  readonly $pageEvent = signal<PageEvent>(this.booksStore.getValue().page);

  readonly $books = this.booksStore.select('books');
  readonly $page = this.booksStore.select('page');

  constructor() {
    effect(() => {
      const q = this.$q();

      if (!q) {
        this.booksStore.reset();
        return;
      }

      const { pageIndex, pageSize } = this.$pageEvent();

      this.booksService.readBooks(q, pageIndex * pageSize, pageSize );
    }, { allowSignalWrites: true });
  }
}
