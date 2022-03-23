import { createReducer, on } from '@ngrx/store';
import { Post } from '../post';
import { PostPageActions, PostApiActions } from './actions';

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
  on(PostApiActions.loadPostsSuccess, (state, action): PostState => {
    return { ...state, posts: action.posts, error: '' };
  }),
  on(PostApiActions.loadPostsFailure, (state, action): PostState => {
    return { ...state, posts: [], error: action.error };
  }),
  on(PostPageActions.toggleShowPostId, (state): PostState => {
    return { ...state, showPostId: !state.showPostId };
  }),
  on(PostPageActions.setCurrentPost, (state, action): PostState => {
    return {
      ...state,
      selectedPostId: action.id ? action.id : null,
    };
  }),
  on(PostPageActions.clearCurrentPost, (state): PostState => {
    return {
      ...state,
      selectedPostId: null,
    };
  }),
  on(PostPageActions.toggleShowEdit, (state): PostState => {
    return { ...state, showEdit: !state.showEdit };
  }),
  on(PostApiActions.deletePostSuccess, (state, action): PostState => {
    const newPosts = state.posts.filter((post) => post?.id != action.id);
    return { ...state, selectedPostId: null, posts: newPosts, error: '' };
  }),
  on(PostApiActions.deletePostFailure, (state, action): PostState => {
    return { ...state, error: action.error };
  }),
  on(PostApiActions.createPostSuccess, (state, action): PostState => {
    return {
      ...state,
      selectedPostId: action.post?.id ? action.post.id : null,
      posts: state.posts.concat(action.post),
      error: '',
    };
  }),
  on(PostApiActions.createPostFailure, (state, action): PostState => {
    return { ...state, error: action.error };
  }),
  on(PostApiActions.updateCurrentPostSuccess, (state, action): PostState => {
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
