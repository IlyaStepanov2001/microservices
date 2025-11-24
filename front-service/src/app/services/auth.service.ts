import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) { }

  signin(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signin`, credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).pipe(
      map((response: any) => {
        if (response && response.token) {
          localStorage.setItem('jwtToken', response.token);
        }
        this.router.navigate(['/main']);  // Переход на нужную страницу
        return response;
      }),
      catchError(error => {
        console.error('Login error', error);
        throw error;
      })
    );
  }

  signup(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup`, credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).pipe(
      catchError(error => {
        console.error('Registration error', error);
        throw error;
      })
    );
  }
}
