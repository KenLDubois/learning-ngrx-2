import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { Post } from '../post';
import { getSelectedPost } from '../state';
import { PostPageActions } from '../state/actions';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostEditComponent implements OnInit {
  postForm?: FormGroup;
  post?: Post;
  newPost: boolean = true;
  selectedPost$?: Observable<Post | undefined>;

  constructor(private fb: FormBuilder, private store: Store<State>) {}

  ngOnInit(): void {
    this.buildForm();

    this.selectedPost$ = this.store
      .select(getSelectedPost)
      .pipe(tap((selectedPost) => this.displayPost(selectedPost)));
  }

  buildForm(): void {
    this.postForm = this.fb.group({
      title: [''],
      body: [''],
    });
  }

  displayPost(post?: Post) {
    this.post = post;
    this.postForm?.reset();

    if (post) {
      this.newPost = false;

      this.postForm?.patchValue({
        title: post?.title,
        body: post?.body,
      });
    } else {
      this.newPost = true;
    }
  }

  onClearCurrentPost(): void {
    this.store.dispatch(PostPageActions.clearCurrentPost());
  }

  onDeletePost(): void {
    if (this.post?.id) {
      this.store.dispatch(PostPageActions.deletePost({ id: this.post.id }));
    }
  }

  onCreatePost(): void {
    this.store.dispatch(
      PostPageActions.createPost({
        post: this.getPostFromForm(),
      })
    );
  }

  onUpdatePost(): void {
    this.store.dispatch(
      PostPageActions.updatePost({
        post: {
          ...this.post,
          title: this.postForm?.get('title')?.value,
          body: this.postForm?.get('body')?.value,
        } as Post,
      })
    );
  }

  getPostFromForm(): Post {
    return {
      title: this.postForm?.get('title')?.value,
      body: this.postForm?.get('body')?.value,
    } as Post;
  }
}
