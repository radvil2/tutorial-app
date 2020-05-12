import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) {}

  baseUrl = environment.apiUrl + 'users';
  user: IUser;

  // create new user.
  createUser(user: IUser): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, user);
  }

  // update user by id.
  updateUser(id: string, user: IUser): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, user);
  }

  // delete user by id.
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  // get all users.
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.baseUrl}`);
  }

  // get user by id.
  getUser(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/${id}`);
  }
}