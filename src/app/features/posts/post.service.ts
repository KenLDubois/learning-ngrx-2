import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Post } from './post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsUrl = 'api/posts';
  private posts?: Post[];

  private selectedPostSource = new BehaviorSubject<Post | null>(null);
  selectedPostChanges$ = this.selectedPostSource.asObservable();

  constructor(private http: HttpClient) {}

  changeSelectedPost(selectedPost: Post | null): void {
    this.selectedPostSource.next(selectedPost);
  }

  getPosts(): Observable<Post[]> {
    if (this.posts) {
      return of(this.posts);
    }
    return this.http.get<Post[]>(this.postsUrl).pipe(
      // tap((data) => console.log(JSON.stringify(data))),
      // tap((x) => console.log('here')),
      tap((data) => (this.posts = data)),
      catchError(this.handleError)
    );
  }

  // Return an initialized post
  newPost(): Post {
    return {
      id: 0,
      title: '',
      body: '',
    };
  }

  createProduct(post: Post): Observable<Post> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // Product Id must be null for the Web API to assign an Id
    const newPost = { ...post, id: null };
    return this.http.post<Post>(this.postsUrl, newPost, { headers }).pipe(
      // tap((data) => console.log('createPost: ' + JSON.stringify(data))),
      tap((data) => {
        if (!this.posts) {
          this.posts = [];
        }
        this.posts.push(data);
      }),
      catchError(this.handleError)
    );
  }

  deletePost(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.postsUrl}/${id}`;
    return this.http.delete<Post>(url, { headers }).pipe(
      tap((data) => console.log('deletePost: ' + id)),
      tap((data) => {
        if (this.posts) {
          const foundIndex = this.posts.findIndex((item) => item.id === id);
          if (foundIndex > -1) {
            this.posts.splice(foundIndex, 1);
          }
        }
      }),
      catchError(this.handleError)
    );
  }

  updatePost(post: Post): Observable<Post> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.postsUrl}/${post.id}`;
    return this.http.put<Post>(url, post, { headers }).pipe(
      tap(() => console.log('updateProduct: ' + post.id)),
      // Update the item in the list
      // This is required because the selected product that was edited
      // was a copy of the item from the array.
      tap(() => {
        if (this.posts) {
          const foundIndex = this.posts.findIndex(
            (item) => item.id === post.id
          );
          if (foundIndex > -1) {
            this.posts[foundIndex] = post;
          }
        }
      }),
      // Return the product on an update
      map(() => post),
      catchError(this.handleError)
    );
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
