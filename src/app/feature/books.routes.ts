import { Routes } from "@angular/router";
import { BooksService, BooksStore } from "../domain";

export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./books.component').then(m => m.BooksComponent),
    providers: [BooksStore, BooksService]
  }
];
