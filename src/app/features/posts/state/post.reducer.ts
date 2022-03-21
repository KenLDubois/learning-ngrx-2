import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

import * as AppState from '../../../state/app.state';
import { Post } from '../post';
import * as PostActions from './post.action';

export interface State extends AppState.State {
  posts: PostState;
}

export interface PostState {
  showPostId: boolean;
  selectedPost: Post | null;
  posts: Post[];
}

const initialState: PostState = {
  showPostId: false,
  selectedPost: null,
  posts: [],
};

const getPostFeatureState = createFeatureSelector<PostState>('posts');

export const getShowPostId = createSelector(
  getPostFeatureState,
  (state) => state.showPostId
);

export const getSelectedPost = createSelector(
  getPostFeatureState,
  (state) => state.selectedPost
);

export const getPosts = createSelector(
  getPostFeatureState,
  (state) => state.posts
);

export const postReducer = createReducer<PostState>(
  initialState,
  on(PostActions.toggleShowPostId, (state): PostState => {
    return { ...state, showPostId: !state.showPostId };
  }),
  on(PostActions.setCurrentPost, (state, action): PostState => {
    return {
      ...state,
      selectedPost: action.post,
    };
  }),
  on(PostActions.clearCurrentPost, (state): PostState => {
    return {
      ...state,
      selectedPost: null,
    };
  })
);
