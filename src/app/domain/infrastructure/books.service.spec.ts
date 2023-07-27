import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createArkMock, createCanHaveStatusMock } from '@e-square/ark/testing';

import { BooksService } from './books.service';
import { BooksStore } from './books.store';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: BooksStore, useValue: { ...createArkMock({}), ...createCanHaveStatusMock() } }, BooksService],
    });
    service = TestBed.inject(BooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
