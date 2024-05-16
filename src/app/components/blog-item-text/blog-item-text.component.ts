import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryPipe } from '../../pipes/summary.pipe';

@Component({
  selector: 'blog-item-text',
  standalone: true,
  imports: [CommonModule, SummaryPipe],
  templateUrl: './blog-item-text.component.html',
  styleUrls: ['./blog-item-text.component.css']
})
export class BlogItemTextComponent {
  @Input() text?: string;
}
