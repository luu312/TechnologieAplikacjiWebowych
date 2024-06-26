import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Post, NewPost } from '../../models/post.model'; 
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-add-post',
  standalone: true,
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  imports: [FormsModule, CommonModule]
})
export class AddPostComponent {
  public newPost: NewPost = { title: '', text: '', image: '', color: '' };

  constructor(private dataService: DataService, private router: Router, private authService: AuthService) {} 

  addPost() {
    const currentUser = this.authService.currentUser;
    if (currentUser) {
      const postWithUser: Post = { ...this.newPost, userId: currentUser.userId, id: '' }; 
      this.dataService.addPost(postWithUser).subscribe(response => {
        console.log('Post added:', response);
        this.router.navigate(['/blog']);
      }, error => {
        console.error('Błąd podczas dodawania postu:', error);
      });
    } else {
      console.error('Nie można dodać postu, użytkownik niezalogowany');
    }
  }
}
