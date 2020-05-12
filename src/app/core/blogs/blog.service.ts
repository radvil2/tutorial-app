import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBlog } from './blog.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BlogService {
  constructor(private http: HttpClient) {}

  baseUrl = environment.apiUrl + 'blogs';
  blog: IBlog;

  // create new blog.
  createBlog(blog: IBlog): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, blog);
  }

  // update blog by id.
  updateBlog(id: string, blog: IBlog): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, blog);
  }

  // delete blog by id.
  deleteBlog(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  // get all blogs.
  getBlogs(): Observable<IBlog[]> {
    return this.http.get<IBlog[]>(`${this.baseUrl}`);
  }

  // get blog by id.
  getBlog(id: string): Observable<IBlog> {
    return this.http.get<IBlog>(`${this.baseUrl}/${id}`);
  }
}