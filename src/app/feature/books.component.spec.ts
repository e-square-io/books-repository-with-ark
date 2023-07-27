import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createArkMock, createCanHaveStatusMock } from '@e-square/ark/testing';

import { BooksComponent } from './books.component';
import { BooksStore, BooksService, Book } from '../domain';
import { Signal, signal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

type BooksServiceMock = Partial<Record<keyof BooksService, jest.Mock>>;
function createBooksServiceMock(): BooksServiceMock {
  return {
    readBooks: jest.fn(),
  };
}

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let store: BooksStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BooksComponent, NoopAnimationsModule],
      providers: [
        { provide: BooksService, useValue: createBooksServiceMock() },
        { provide: BooksStore, useValue: { ...createArkMock({}), ...createCanHaveStatusMock() } }
      ]
    });
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(BooksStore);
    (component.$books as Signal<Book[]>) = signal([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
