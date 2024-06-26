
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, catchError } from 'rxjs/operators';
import { Token } from '../models/token';
import { DOCUMENT } from '@angular/common';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3100/api'; // Backend na porcie 3100

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {}

  authenticate(credentials: any) {
    console.log('Authenticating with credentials:', credentials);
    const localStorage = this.document.defaultView?.localStorage;
    return this.http
      .post(this.url + '/user/auth', {
        login: credentials.login,
        password: credentials.password,
      })
      .pipe(
        map((result: Token | any) => {
          console.log('Authentication result:', result);
          if (result && result.token) {
            console.log('Token received, storing in localStorage');
            localStorage?.setItem('token', result.token);
            return true;
          }
          console.log('Authentication failed, no token received');
          return false;
        }),
        catchError(this.handleError)
      );
  }

  createOrUpdate(credentials: any) {
    console.log('Creating or updating user with credentials:', credentials);
    return this.http.post(this.url + '/user/create', credentials).pipe(
      map((result) => {
        console.log('User creation result:', result);
        return result;
      }),
      catchError((error) => {
        console.error('Error during user creation:', error);
        return throwError(error);
      })
    );
  }

  logout() {
    console.log('Logging out current user');
    const localStorage = this.document.defaultView?.localStorage;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http
      .delete(this.url + '/user/logout/' + this.currentUser?.userId, { headers })
      .pipe(
        map(() => {
          console.log('User logged out, removing token from localStorage');
          localStorage?.removeItem('token');
        }),
        catchError(this.handleError)
      );
  }

  isLoggedIn() {
    const localStorage = this.document.defaultView?.localStorage;
    const jwtHelper = new JwtHelperService();
    const token = localStorage?.getItem('token');
    if (!token) {
      return false;
    }
    const isExpired = jwtHelper.isTokenExpired(token);
    console.log('Token is expired:', isExpired);
    return !isExpired;
  }

  get currentUser() {
    const token = this.getToken();
    if (!token) {
      console.log('No token found for current user');
      return null;
    }

    const decodedToken = new JwtHelperService().decodeToken(token);
    console.log('Decoded token:', decodedToken);
    return decodedToken;
  }

  getToken() {
    const localStorage = this.document.defaultView?.localStorage;
    const token = localStorage?.getItem('token');
    console.log('Retrieved token:', token);
    return token;
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
