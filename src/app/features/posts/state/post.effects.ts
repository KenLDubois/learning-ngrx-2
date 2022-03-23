import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of } from 'rxjs';
import { Post } from '../post';
import { PostService } from '../post.service';
import * as PostActions from './post.action';

@Injectable({ providedIn: 'root' })
export class PostEffects {
  constructor(private actions$: Actions, private postService: PostService) {}

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.loadPosts),
      mergeMap(() =>
        this.postService.getPosts().pipe(
          map((posts) => PostActions.loadPostsSuccess({ posts })),
          catchError((error) => of(PostActions.loadPostsFailure({ error })))
        )
      )
    );
  });

  createPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.createPost),
      concatMap((action) =>
        this.postService.createPost(action.post).pipe(
          map((post) => PostActions.createPostSuccess({ post })),
          catchError((error) => of(PostActions.createPostFailure({ error })))
        )
      )
    );
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.updatePost),
      concatMap((action) =>
        this.postService.updatePost(action.post).pipe(
          map((post) => PostActions.updateCurrentPostSuccess({ post })),
          catchError((error) =>
            of(PostActions.updateCurrentPostFailure({ error }))
          )
        )
      )
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostActions.deletePost),
      mergeMap((action) =>
        this.postService.deletePost(action.id).pipe(
          map(() => PostActions.deletePostSuccess({ id: action.id })),
          catchError((error) => of(PostActions.deletePostFailure({ error })))
        )
      )
    );
  });
}
