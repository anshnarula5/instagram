import { REGISTER_FAIL, REGISTER_SUCCESS } from "../type";

const initialState = {
  isAuthenticated: false,
  loading: true,
  token: localStorage.getItem("token"),
  user: null,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
        isAuthenticated: true,
        token: localStorage.setItem("token", payload.token),
      };
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return { ...state, loading: false, isAuthenticated: false, token: null };

    default:
      return state;
  }
};

export default auth
