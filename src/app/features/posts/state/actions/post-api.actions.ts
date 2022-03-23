import { createAction, props } from '@ngrx/store';
import { Post } from '../../post';

export const loadPostsSuccess = createAction(
  '[Post API] Load Posts Success',
  props<{ posts: Post[] }>()
);

export const loadPostsFailure = createAction(
  '[Post API] Load Posts Fail',
  props<{ error: any }>()
);

export const deletePostSuccess = createAction(
  '[Post API] Delete Current Post Success',
  props<{ id: number }>()
);

export const deletePostFailure = createAction(
  '[Post API] Delete Current Post Failure',
  props<{ error: any }>()
);

export const createPostSuccess = createAction(
  '[Post API] Create Post Success',
  props<{ post: Post }>()
);

export const createPostFailure = createAction(
  '[Post API] Create Post Failure',
  props<{ error: any }>()
);

export const updateCurrentPostSuccess = createAction(
  '[Post API] Update Current Post Success',
  props<{ post: Post }>()
);

export const updateCurrentPostFailure = createAction(
  '[Post API] Update Current Post Failure',
  props<{ error: any }>()
);
