import { CREATE_POST, GET_POSTS, POST_ERROR, LIKE_POST, DELETE_POST } from "../type";

const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: {},
};

const post = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return { ...state, posts: payload, loading: false };
    case CREATE_POST:
      return { ...state, post: payload, loading: false };
    case POST_ERROR:
      return { ...state, error: payload, loading: false };
    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case DELETE_POST:
      return {...state, posts : state.posts.filter(post => post._id !== payload), loading : false }
    default:
      return state;
  }
};

export default post;
