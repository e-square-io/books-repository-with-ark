import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'books',
    loadChildren: () => import('./feature/books.routes').then(m => m.BOOKS_ROUTES),
  },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
];
