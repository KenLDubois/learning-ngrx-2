import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post } from '../post';
import { PostService } from '../post.service';
import {
  getError,
  getPosts,
  getSelectedPost,
  getShowPostId,
  State,
} from '../state/post.reducer';
import * as PostActions from '../state/post.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  showPostId$?: Observable<boolean>;

  // Used to highlight the selected product in the list
  selectedPost$?: Observable<Post | null>;
  posts$?: Observable<Post[]>;
  error$?: Observable<string>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(PostActions.loadPosts());

    this.posts$ = this.store.select(getPosts);

    this.selectedPost$ = this.store.select(getSelectedPost);

    this.showPostId$ = this.store.select(getShowPostId);

    this.error$ = this.store.select(getError);
  }

  ngOnDestroy(): void {}

  checkChanged(): void {
    this.store.dispatch(PostActions.toggleShowPostId());
  }

  postSelected(post: Post): void {
    this.store.dispatch(PostActions.setCurrentPost({ post }));
  }
}
