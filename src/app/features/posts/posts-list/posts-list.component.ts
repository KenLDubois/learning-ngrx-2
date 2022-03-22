import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post } from '../post';
import { PostService } from '../post.service';
import {
  getPosts,
  getSelectedPost,
  getShowPostId,
  State,
} from '../state/post.reducer';
import * as PostActions from '../state/post.action';

@Component({
  selector: 'posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  errorMessage?: string;

  displayCode?: boolean;

  posts?: Post[];

  showId?: boolean;

  // Used to highlight the selected product in the list
  selectedPost?: Post | null;

  constructor(private postService: PostService, private store: Store<State>) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe({
      next: (posts: Post[]) =>
        this.store.dispatch(PostActions.populatePosts({ posts })),
      error: (err) => (this.errorMessage = err),
    });

    this.store.select(getPosts).subscribe((posts) => {
      this.posts = posts;
    });

    // TODO: need to unsubscribe
    this.store.select(getSelectedPost).subscribe((currentPost) => {
      this.selectedPost = currentPost;
    });

    //TODO: need to unsubscribe
    this.store.select(getShowPostId).subscribe((showPostId) => {
      this.showId = showPostId;
    });
  }

  ngOnDestroy(): void {}

  checkChanged(): void {
    this.store.dispatch(PostActions.toggleShowPostId());
  }

  newPost(): void {
    this.postService.changeSelectedPost(this.postService.newPost());
  }

  postSelected(post: Post): void {
    this.store.dispatch(PostActions.setCurrentPost({ post }));
  }
}
