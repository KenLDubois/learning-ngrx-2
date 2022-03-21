import { createAction, props } from '@ngrx/store';
import { Post } from '../post';

export const toggleShowPostId = createAction('[Post] Toggle Post Id');

export const setCurrentPost = createAction(
  '[Post] Set Current Post',
  props<{ post: Post }>()
);

export const clearCurrentPost = createAction('[Post] Clear Current Post');
