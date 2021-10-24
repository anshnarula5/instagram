import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from "../type";

const initialState = {
  isAuthenticated: false,
  loading: true,
  token: localStorage.getItem("token"),
  user: null,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return { ...state, isAuthenticated: true, user: payload, loading: false };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
        isAuthenticated: true,
        token: localStorage.setItem("token", payload.token),
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:

      localStorage.removeItem("token");
      return { ...state, loading: false, isAuthenticated: false, token: null };

    default:
      return state;
  }
};

export default auth;
