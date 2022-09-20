import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements OnInit {
  isAuthenticated = new BehaviorSubject(true);

  constructor() {}
  ngOnInit() {
    this.getToken() || '';
  }

  setToken(token) {
    localStorage.setItem('user_Token', token);
    this.isAuthenticated.next(token);
  }

  getToken() {
    return localStorage.getItem('user_Token');
  }

  logout() {
    this.setToken('');
  }
}
