import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { Post } from '../post';
import { getSelectedPost } from '../state/post.reducer';

@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  selectedPost: Post | null = null;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    // TODO: unsubscribe
    this.store
      .select(getSelectedPost)
      .subscribe((currentPost) => (this.selectedPost = currentPost));
  }
}
