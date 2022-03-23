import {
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
  selectedPostId: number | null;
  posts: Post[];
  showEdit: boolean;
  error: string;
}

const initialState: PostState = {
  showPostId: false,
  selectedPostId: null,
  posts: [],
  showEdit: false,
  error: '',
};

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

export const postReducer = createReducer<PostState>(
  initialState,
  on(PostActions.loadPostsSuccess, (state, action): PostState => {
    return { ...state, posts: action.posts, error: '' };
  }),
  on(PostActions.loadPostsFailure, (state, action): PostState => {
    return { ...state, posts: [], error: action.error };
  }),
  on(PostActions.toggleShowPostId, (state): PostState => {
    return { ...state, showPostId: !state.showPostId };
  }),
  on(PostActions.setCurrentPost, (state, action): PostState => {
    return {
      ...state,
      selectedPostId: action.id ? action.id : null,
    };
  }),
  on(PostActions.clearCurrentPost, (state): PostState => {
    return {
      ...state,
      selectedPostId: null,
    };
  }),
  on(PostActions.toggleShowEdit, (state): PostState => {
    return { ...state, showEdit: !state.showEdit };
  }),
  on(PostActions.deletePostSuccess, (state, action): PostState => {
    const newPosts = state.posts.filter((post) => post?.id != action.id);
    return { ...state, selectedPostId: null, posts: newPosts, error: '' };
  }),
  on(PostActions.deletePostFailure, (state, action): PostState => {
    return { ...state, error: action.error };
  }),
  on(PostActions.createPostSuccess, (state, action): PostState => {
    return {
      ...state,
      selectedPostId: action.post?.id ? action.post.id : null,
      posts: state.posts.concat(action.post),
      error: '',
    };
  }),
  on(PostActions.createPostFailure, (state, action): PostState => {
    return { ...state, error: action.error };
  }),
  on(PostActions.updateCurrentPostSuccess, (state, action): PostState => {
    const updatedPosts = state.posts.map((item) =>
      action.post?.id && action.post.id === item.id ? action.post : item
    );
    return {
      ...state,
      posts: updatedPosts,
      selectedPostId: action.post?.id ? action.post.id : null,
      error: '',
    };
  })
);
