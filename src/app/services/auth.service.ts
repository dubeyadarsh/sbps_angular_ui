import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  Router } from '@angular/router';
import { apiURL } from '../constants/constant';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${apiURL}`; // Update with your Express backend URL

  constructor(private http: HttpClient,private router:Router) {}

  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    const deleteAfterMilliseconds = 60 * 60 * 10000; // 1 hour
      setTimeout(() => {
            localStorage.removeItem('token');
      }, deleteAfterMilliseconds);
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  logout(){
    localStorage.setItem('token', '');
    this.router.navigate(['/']);
  }

}
