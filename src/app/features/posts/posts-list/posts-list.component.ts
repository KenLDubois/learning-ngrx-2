import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from '../post';
import { PostService } from '../post.service';
import { getShowPostId, State } from '../state/post.reducer';

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
  sub?: Subscription;

  constructor(private postService: PostService, private store: Store<State>) {}

  ngOnInit(): void {
    this.sub = this.postService.selectedPostChanges$.subscribe(
      (currentPost) => (this.selectedPost = currentPost)
    );

    this.postService.getPosts().subscribe({
      next: (posts: Post[]) => (this.posts = posts),
      error: (err) => (this.errorMessage = err),
    });

    //TODO: need to unsubscribe
    this.store.select(getShowPostId).subscribe((showPostId) => {
      this.showId = showPostId;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  checkChanged(): void {
    // this.displayCode = !this.displayCode;
    this.store.dispatch({ type: '[Post] Toggle Post Id' });
  }

  newPost(): void {
    this.postService.changeSelectedPost(this.postService.newPost());
  }

  postSelected(post: Post): void {
    this.postService.changeSelectedPost(post);
  }
}
