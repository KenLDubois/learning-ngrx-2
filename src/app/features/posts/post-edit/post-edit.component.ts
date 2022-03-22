import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { Post } from '../post';
import { getSelectedPost } from '../state/post.reducer';
import * as PostActions from '../state/post.action';

@Component({
  selector: 'post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss'],
})
export class PostEditComponent implements OnInit {
  postForm?: FormGroup;
  post: Post | null = null;
  newPost: boolean = true;

  constructor(private fb: FormBuilder, private store: Store<State>) {}

  ngOnInit(): void {
    this.buildForm();

    this.store.select(getSelectedPost).subscribe((state) => {
      this.displayPost(state);
    });
  }

  buildForm(): void {
    this.postForm = this.fb.group({
      title: [''],
      body: [''],
    });
  }

  displayPost(post: Post | null) {
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
    this.store.dispatch(PostActions.clearCurrentPost());
  }

  onDeletePost(): void {
    this.store.dispatch(PostActions.deleteCurrentPost());
  }

  onCreatePost(): void {
    this.store.dispatch(
      PostActions.createPost({
        post: {
          title: this.postForm?.get('title')?.value,
          body: this.postForm?.get('body')?.value,
        } as Post,
        showEdit: false,
      })
    );
  }

  onSaveEditPost(): void {
    this.store.dispatch(
      PostActions.editCurrentPost({
        post: {
          ...this.post,
          title: this.postForm?.get('title')?.value,
          body: this.postForm?.get('body')?.value,
        } as Post,
      })
    );
  }
}
