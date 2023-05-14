import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}
  adduser(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/users', data);
  };
  edituser(id:number, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/users/${id}`, data);
  };
  GetUserList(): Observable<any> {
    return this.http.get('http://localhost:3000/users');
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/users/${id}`);
  }
}