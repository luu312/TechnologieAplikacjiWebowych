import { Component, Input } from '@angular/core';

@Component({
  selector: 'blog-item-image',
  standalone: true,
  imports: [],
  templateUrl: './blog-item-image.component.html',
  styleUrls: ['./blog-item-image.component.css']
})
export class BlogItemImageComponent {
  @Input() image?: string;
}
