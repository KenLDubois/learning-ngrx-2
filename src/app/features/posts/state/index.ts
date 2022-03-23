import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as AppState from '../../../state/app.state';
import { PostState } from './post.reducer';

export interface State extends AppState.State {
  posts: PostState;
}

const getPostFeatureState = createFeatureSelector<PostState>('posts');

export const getShowPostId = createSelector(
  getPostFeatureState,
  (state) => state.showPostId
);

export const getSelectedPost = createSelector(getPostFeatureState, (state) =>
  state.selectedPostId != undefined
    ? state.posts.find((p) => p.id == state.selectedPostId)
    : undefined
);

export const getPosts = createSelector(
  getPostFeatureState,
  (state) => state.posts
);

export const getShowEdit = createSelector(
  getPostFeatureState,
  (state) => state.showEdit
);

export const getError = createSelector(
  getPostFeatureState,
  (state) => state.error
);
