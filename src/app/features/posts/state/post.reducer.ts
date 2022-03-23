import { createReducer, on } from '@ngrx/store';
import { Post } from '../post';
import * as PostActions from './post.action';

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
