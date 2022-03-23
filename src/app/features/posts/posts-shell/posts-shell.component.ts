import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import {
  getError,
  getPosts,
  getSelectedPost,
  getShowEdit,
  getShowPostId,
} from '../state';
import { PostPageActions } from '../state/actions';
import { Post } from '../post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts-shell',
  templateUrl: './posts-shell.component.html',
  styleUrls: ['./posts-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsShellComponent implements OnInit {
  showEdit?: boolean;
  posts$?: Observable<Post[]>;
  selectedPost$?: Observable<Post | undefined>;
  showPostId$?: Observable<boolean>;
  error$?: Observable<string>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.select(getShowEdit).subscribe((state) => {
      this.showEdit = state;
    });

    this.store.dispatch(PostPageActions.loadPosts());

    this.posts$ = this.store.select(getPosts);

    this.selectedPost$ = this.store.select(getSelectedPost);

    this.showPostId$ = this.store.select(getShowPostId);

    this.error$ = this.store.select(getError);
  }

  toggleEdit(): void {
    this.store.dispatch(PostPageActions.toggleShowEdit());
  }

  onShowPostIdToggled(): void {
    this.store.dispatch(PostPageActions.toggleShowPostId());
  }

  onPostSelected(post: Post): void {
    this.store.dispatch(PostPageActions.setCurrentPost({ id: post?.id }));
  }
}
