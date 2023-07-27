import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from 'src/app/domain';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent {
  @Input() book?: Book;
}
