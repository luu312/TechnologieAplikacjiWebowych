import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { BlogItemComponent } from '../blog-item/blog-item.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FilterTextPipe } from '../../pipes/filter-text.pipe';
import { Router } from '@angular/router';
import { Post } from '../../models/post.model'; 
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [BlogItemComponent, CommonModule, SearchBarComponent, FilterTextPipe],
  providers: [DataService],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  @Input() filterText: string = '';

  public items$: Post[] = []; 
  public currentUser: any; 

  constructor(private service: DataService, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe({
      next: (response: Post[]) => {
        console.log('Received items:', response); 
        response.forEach((item: Post) => {
          console.log('Item:', item); 
          console.log('Item ID:', item.id); 
        });
        this.items$ = response;
      },
      error: (error) => {
        console.error('Błąd podczas pobierania danych:', error);
      }
    });
  }

  editPost(id: string) {
    console.log("Edit post ID:", id);  
    if (id) {
      this.router.navigate(['/edit-post', id]);
    } else {
      console.error('Edit post ID is undefined');
    }
  }

  deletePost(id: string) {
    console.log("Delete post ID:", id);  
    if (id) {
      this.service.deletePost(id).subscribe(() => {
        this.getAll();
      }, error => {
        console.error('Błąd podczas usuwania postu:', error);
      });
    } else {
      console.error('Delete post ID is undefined');
    }
  }
}
