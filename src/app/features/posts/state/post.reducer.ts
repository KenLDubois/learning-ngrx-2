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
  selectedPost: Post | null;
  posts: Post[];
  showEdit: boolean;
}

const initialState: PostState = {
  showPostId: false,
  selectedPost: null,
  posts: [],
  showEdit: false,
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

export const getShowEdit = createSelector(
  getPostFeatureState,
  (state) => state.showEdit
);

export const postReducer = createReducer<PostState>(
  initialState,
  on(PostActions.loadPosts, (state): PostState => {
    return { ...state };
  }),
  on(PostActions.loadPostsSuccess, (state, action): PostState => {
    return { ...state, posts: action.posts };
  }),
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
  }),
  on(PostActions.toggleShowEdit, (state): PostState => {
    return { ...state, showEdit: !state.showEdit };
  }),
  on(PostActions.deleteCurrentPost, (state): PostState => {
    if (state.selectedPost) {
      let i = state.posts.findIndex((p) => {
        return state.selectedPost?.id && p?.id == state.selectedPost?.id;
      });

      if (i > -1 && i < state.posts.length) {
        return {
          ...state,
          selectedPost: null,
          posts: state.posts.slice(0, i).concat(state.posts.slice(i + 1)),
        };
      }
    }
    return { ...state };
  }),
  on(PostActions.createPost, (state, action): PostState => {
    let showEdit =
      action?.showEdit != undefined ? action.showEdit : state.showEdit;

    console.log(showEdit);

    let id =
      Math.max.apply(
        Math,
        state.posts.map(function (p) {
          return p?.id ? p.id : -1;
        })
      ) + 1;

    let post = {
      ...action.post,
      id: id,
    } as Post;

    return {
      ...state,
      posts: state.posts.concat(post),
      selectedPost: post,
      showEdit: showEdit,
    };
  }),
  on(PostActions.editCurrentPost, (state, action): PostState => {
    let i = state.posts.findIndex((p) => {
      return state.selectedPost?.id && p?.id == state.selectedPost?.id;
    });

    if (i > -1 && i < state.posts.length) {
      let post = {
        ...state.posts[i],
        title: action.post?.title,
        body: action.post?.body,
      } as Post;

      return {
        ...state,
        posts: state.posts.slice(0, i).concat(post, state.posts.slice(i + 1)),
      };
    }
    return { ...state };
  })
);
