import { Injectable } from '@angular/core';
import { Register, Login } from '../models/auth';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'api/auth';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) { }

  register(data: Register): Observable<any> {
    console.log(data);
    return this.http.post(this.authUrl + '/register', data, this.httpOptions);
  }

  login(data: Login): Observable<any> {
    return this.http.post(this.authUrl + '/login', data, this.httpOptions);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  loading(): Observable<any> {
    return this.http.get('/api/loading');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token == null) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }
}
