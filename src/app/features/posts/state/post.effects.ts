import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { PostService } from '../post.service';
import * as PostActions from './post.action';

@Injectable({ providedIn: 'root' })
export class PostEffects {
  constructor(private actions$: Actions, private postService: PostService) {}

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.loadPosts),
      mergeMap(() =>
        this.postService
          .getPosts()
          .pipe(map((posts) => PostActions.loadPostsSuccess({ posts })))
      )
    );
  });
}
