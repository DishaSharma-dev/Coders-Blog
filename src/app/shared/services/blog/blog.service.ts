import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { API_URL } from 'src/app/constants';
import BlogModel from '../../models/blog.model';
import CommentModel from '../../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}
  
  public isDelete = new Subject<String>();

  getAllBlogs(): Observable<BlogModel[]> {
    return this.http.get<BlogModel[]>(`${API_URL}blog/all`);
  }

  getBlog(id: String): Observable<BlogModel> {
    return this.http.get<BlogModel>(`${API_URL}blog/${id}`);
  }

  updateBlog(id: String, body: BlogModel) {
    return this.http.put(`${API_URL}${id}`, body);
  }

  deleteBlog(id: String) {
    return this.http.delete(`${API_URL}blog/${id}`, {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('auth_token') || ''
      ),
    });
  }

  getUsersBlog(): Observable<BlogModel[]> {
    return this.http.get<BlogModel[]>(`${API_URL}blog/user`, {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('auth_token') || ''
      ),
    });
  }

  addComment(id: String, comment: CommentModel) {
    return this.http.put(`${API_URL}blog/comment/${id}`, comment, {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('auth_token') || ''
      ),
    });
  }

  addBlog(blog: BlogModel) {
    return this.http.post(`${API_URL}blog`, blog, {
      headers: new HttpHeaders().set(
        'Authorization',
        localStorage.getItem('auth_token') || ''
      ),
    });
  }

  likeBlog(id: String, likes: Number) {
    return this.http.patch(
      `${API_URL}blog/like/${id}`,
      { Likes: likes },
      {
        headers: new HttpHeaders().set(
          'Authorization',
          localStorage.getItem('auth_token') || ''
        ),
      }
    );
  }

  changeVisibilityBlog(id: String, record: any) {
    return this.http.patch(`${API_URL}${id}`, record);
  }
}
