
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Post, NewPost } from '../models/post.model'; 

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'http://localhost:3100/api/posts';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addPost(post: NewPost): Observable<Post> { 
    return this.http.post<Post>(this.url, post, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.url}/${post.id}`, post, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Nieznany błąd!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Błąd klienta: ${error.error.message}`;
    } else {
      errorMessage = `Błąd serwera: ${error.status}\nKomunikat: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
