import axios from "axios";
import {setAlert} from "./alerts";
import {REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT, CLEAR_PROFILE} from "../type";

import setAuthToken from "../../utils/setAuthToken"
import {getProfile} from "./profile";

const url = "http://localhost:5000"

//Load user

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    const res = await axios.get(`${url}/api/auth`)
    dispatch({type: USER_LOADED, payload: res.data})
    dispatch(getProfile())
  } catch (error) {
    dispatch({type : AUTH_ERROR})
  }
}


//Register user

export const register = formData => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`${url}/api/user`, formData, config);
    dispatch({type: REGISTER_SUCCESS, payload: res.data});
    dispatch(loadUser())
  } catch (error) {
      const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
      }
    dispatch({ type: REGISTER_FAIL });
  }
}

export const login = formData => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`${url}/api/auth`, formData, config)
    dispatch({type: LOGIN_SUCCESS, payload: res.data})
    dispatch(loadUser())

  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
      }
    dispatch({ type: LOGIN_FAIL });
  }
}

//logout

export const logout = () => dispatch => {
  try {
    dispatch({type : CLEAR_PROFILE})
    dispatch({type: LOGOUT})
  } catch (error) {
    dispatch({type : AUTH_ERROR})
  }
}