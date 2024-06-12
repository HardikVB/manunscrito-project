import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'accessToken';
  private tokenSubject: BehaviorSubject<string | null>;

  constructor() {
    const savedToken = localStorage.getItem(this.tokenKey);
    this.tokenSubject = new BehaviorSubject<string | null>(savedToken);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getTokenObservable(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.tokenSubject.next(token);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.tokenSubject.next(null);
  }
}
