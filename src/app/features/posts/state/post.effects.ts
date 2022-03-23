import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of } from 'rxjs';
import { PostService } from '../post.service';
import { PostPageActions, PostApiActions } from './actions';

@Injectable({ providedIn: 'root' })
export class PostEffects {
  constructor(private actions$: Actions, private postService: PostService) {}

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostPageActions.loadPosts),
      mergeMap(() =>
        this.postService.getPosts().pipe(
          map((posts) => PostApiActions.loadPostsSuccess({ posts })),
          catchError((error) => of(PostApiActions.loadPostsFailure({ error })))
        )
      )
    );
  });

  createPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostPageActions.createPost),
      concatMap((action) =>
        this.postService.createPost(action.post).pipe(
          map((post) => PostApiActions.createPostSuccess({ post })),
          catchError((error) => of(PostApiActions.createPostFailure({ error })))
        )
      )
    );
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostPageActions.updatePost),
      concatMap((action) =>
        this.postService.updatePost(action.post).pipe(
          map((post) => PostApiActions.updateCurrentPostSuccess({ post })),
          catchError((error) =>
            of(PostApiActions.updateCurrentPostFailure({ error }))
          )
        )
      )
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostPageActions.deletePost),
      mergeMap((action) =>
        this.postService.deletePost(action.id).pipe(
          map(() => PostApiActions.deletePostSuccess({ id: action.id })),
          catchError((error) => of(PostApiActions.deletePostFailure({ error })))
        )
      )
    );
  });
}
