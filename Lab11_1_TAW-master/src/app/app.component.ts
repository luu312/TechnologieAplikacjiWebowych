import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, BlogComponent, NavbarComponent],
})
export class AppComponent {
  public counter: number = 0;

  add() {
    this.counter++;
  }

  remove() {
    this.counter--;
  }
}


