import { EDIT_PROFILE, GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, FOLLOW } from "../type";

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
};

const profile = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case EDIT_PROFILE:
      return { ...state, profile: payload, loading: false };
    case PROFILE_ERROR:
    case CLEAR_PROFILE:
      return { ...state, profile: null, loading: false, error: payload };
    case FOLLOW:
      return {...state, profile: {...state.profile, followers : payload }, loading: false}
    default:
      return state;
  }
};

export default profile;
