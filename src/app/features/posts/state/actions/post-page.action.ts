import { createAction, props } from '@ngrx/store';
import { Post } from '../../post';

export const loadPosts = createAction('[Post Page] Load Posts');

export const setCurrentPost = createAction(
  '[Post Page] Set Current Post',
  props<{ id?: number }>()
);

export const deletePost = createAction(
  '[Post Page] Delete Current Post',
  props<{ id: number }>()
);

export const clearCurrentPost = createAction('[Post Page] Clear Current Post');

export const createPost = createAction(
  '[Post Page] Create Post',
  props<{ post: Post }>()
);

export const updatePost = createAction(
  '[Post Page] Update Current Post',
  props<{ post: Post }>()
);

export const toggleShowPostId = createAction('[Post Page] Toggle Show Post Id');

export const toggleShowEdit = createAction('[Post Page] Toggle Show Edit');
