import { Component, Input } from '@angular/core';
import { SummaryPipe } from '../../pipes/summary.pipe';

@Component({
  selector: 'blog-item',
  standalone: true,
  imports: [SummaryPipe],
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css']
})
export class BlogItemComponent {
  @Input() image?: string;
  @Input() text?: string;
}
