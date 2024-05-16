import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { BlogItemComponent } from '../blog-item/blog-item.component';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'blog',
  standalone: true,
  imports: [BlogItemComponent, CommonModule],
  providers: [DataService],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  public items$: Observable<any[]> = of([]); 

  constructor(private service: DataService) {}

  ngOnInit() {
    this.items$ = of(this.service.getAll());
  }
}
