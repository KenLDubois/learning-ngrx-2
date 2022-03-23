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

export const toggleShowPostId = createAction('[Post] Toggle Show Post Id');

export const setCurrentPost = createAction(
  '[Post] Set Current Post',
  props<{ post: Post }>()
);

export const clearCurrentPost = createAction('[Post] Clear Current Post');

export const toggleShowEdit = createAction('[Post] Toggle Show Edit');

export const deleteCurrentPost = createAction('[Post] Delete Current Post');

export const createPost = createAction(
  '[Post] Create Post',
  props<{ post: Post; showEdit?: boolean }>()
);

export const editCurrentPost = createAction(
  '[Post] Edit Current Post',
  props<{ post: Post }>()
);
