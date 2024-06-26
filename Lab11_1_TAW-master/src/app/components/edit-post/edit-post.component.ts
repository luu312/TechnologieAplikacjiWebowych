import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
  imports: [CommonModule, FormsModule]
})
export class EditPostComponent implements OnInit {
  public post: any = { title: '', text: '', image: '', color: '' };

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.dataService.getById(postId).subscribe((data) => {
        this.post = data;
      });
    }
  }

  updatePost() {
    this.dataService.updatePost(this.post).subscribe(() => {
      this.router.navigate(['/blog']);
    });
  }
}
