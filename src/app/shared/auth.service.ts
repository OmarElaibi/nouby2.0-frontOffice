import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint = 'http://localhost:8015/authentication';
  currentUser: User;
  private http: HttpClient;

  constructor(private router: Router, private handler: HttpBackend) {
    this.http = new HttpClient(handler);
   }

  signIn(user: User) {
    return this.http.post(this.endpoint, user);
  }

  afterLoginUser(data) {
    this.currentUser = data.user;
    localStorage.setItem('current_user_role', data.user.role.id);
    localStorage.setItem('current_user_id', data.user.id);
    localStorage.setItem('access_token', data.token);
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user_role');
    localStorage.removeItem('current_user_id');
    this.router.navigateByUrl('login');
  }

  isLoggedIn() {
    return !!localStorage.getItem('access_token');
  }

  getToken() {
    return localStorage.getItem('access_token');
  }
}
