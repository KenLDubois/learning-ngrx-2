import { createAction, props } from '@ngrx/store';
import { Post } from '../post';

export const loadPosts = createAction('[Post] Load Posts');

export const loadPostsSuccess = createAction(
  '[Post] Load Posts Success',
  props<{ posts: Post[] }>()
);

export const loadPostsFailure = createAction(
  '[Post] Load Posts Fail',
  props<{ error: any }>()
);

export const setCurrentPost = createAction(
  '[Post] Set Current Post',
  props<{ id?: number }>()
);

export const deletePost = createAction(
  '[Post] Delete Current Post',
  props<{ id: number }>()
);

export const deletePostSuccess = createAction(
  '[Post] Delete Current Post Success',
  props<{ id: number }>()
);

export const deletePostFailure = createAction(
  '[Post] Delete Current Post Failure',
  props<{ error: any }>()
);

export const clearCurrentPost = createAction('[Post] Clear Current Post');

export const createPost = createAction(
  '[Post] Create Post',
  props<{ post: Post }>()
);

export const createPostSuccess = createAction(
  '[Post] Create Post Success',
  props<{ post: Post }>()
);

export const createPostFailure = createAction(
  '[Post] Create Post Failure',
  props<{ error: any }>()
);

export const updatePost = createAction(
  '[Post] Update Current Post',
  props<{ post: Post }>()
);

export const updateCurrentPostSuccess = createAction(
  '[Post] Update Current Post Success',
  props<{ post: Post }>()
);

export const updateCurrentPostFailure = createAction(
  '[Post] Update Current Post Failure',
  props<{ error: any }>()
);

export const toggleShowPostId = createAction('[Post] Toggle Show Post Id');

export const toggleShowEdit = createAction('[Post] Toggle Show Edit');
