
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { BlogItemImageComponent } from '../blog-item-image/blog-item-image.component';
import { BlogItemTextComponent } from '../blog-item-text/blog-item-text.component';

@Component({
  selector: 'app-blog-item',
  standalone: true,
  imports: [BlogItemImageComponent, BlogItemTextComponent],
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css']
})
export class BlogItemComponent implements OnInit, OnChanges {
  @Input() image?: string;
  @Input() text?: string;
  @Input() id?: string;
  @Input() title?: string;
  @Input() color?: string;
  @Input() isOwner?: boolean; 

  private availableColors = ['Blue', 'Green', 'Red', 'Yellow', 'Light-blue', 'White', 'Black'];

  ngOnInit() {
    console.log('BlogItemComponent id on init:', this.id); 
    if (!this.color) {
      this.color = this.getRandomColor();
    }
  }

  ngOnChanges() {
    console.log('BlogItemComponent id on changes:', this.id); 
  }

  getColorClass(color: string | undefined): string {
    return `text-bg-${color} mb-3`;
  }

  private getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.availableColors.length);
    return this.availableColors[randomIndex];
  }
}
