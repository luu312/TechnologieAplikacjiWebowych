import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  providers: [AuthService],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public credentials = {
    name: '',
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit() {}

  create() {
    console.log('Creating user with credentials:', this.credentials);
    this.authService.createOrUpdate(this.credentials).subscribe((result) => {
      console.log('User creation result:', result);
      this.router.navigate(['/login']);
    });
  }
}
