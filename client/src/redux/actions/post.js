import axios from "axios";
import { COMMENT, CREATE_POST, DELETE_COMMENT, DELETE_POST, GET_POSTS, LIKE_COMMENT, LIKE_POST, POST_ERROR } from "../type";
import { setAlert } from "./alerts";
import {getProfile, getProfileById} from "./profile";

const url = "https://instagram-a5.herokuapp.com/api/posts";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(`${url}`);
    dispatch({type: GET_POSTS, payload: res.data});
    dispatch(getProfile())
  } catch (error) {
    dispatch({ type: POST_ERROR, payload : {msg : error.response.statusText, status : error.response.status} });
    console.log(error)
  }
};

export const createPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`${url}`, formData, config);
    dispatch({type: CREATE_POST, payload: res.data});
    
  } catch (error) {
    dispatch(setAlert("File too large", "danger"))
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({ type: POST_ERROR, payload : {msg : error.response.statusText, status : error.response.status} });
  }
};

export const likePost = (id, userId) => async (dispatch) => {
  try {
    const res = await axios.patch(`${url}/${id}/like`);
    dispatch({type: LIKE_POST, payload: {id, likes: res.data}});
    if (userId) {
      dispatch(getProfileById(userId))
    }
  } catch (error) {
    dispatch({ type: POST_ERROR, payload : {msg : error.response.statusText, status : error.response.status} });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`${url}/${id}`)
    dispatch({type : DELETE_POST, payload : id})
    dispatch(setAlert("Deleted post", "success"))
  } catch (error) {
    dispatch({ type: POST_ERROR, payload : {msg : error.response.statusText, status : error.response.status} });
  }
}

export const comment = (id, text, userId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`${url}/comment/${id}`, text, config);
    console.log(res)
    dispatch({type: COMMENT, payload: res.data});
    if (userId) {
      dispatch(getProfileById(userId))
    } else {
      dispatch(getPosts())
    }
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({ type: POST_ERROR, payload : {msg : error.response.statusText, status : error.response.status} });
  }
};

export const likeComment = (id, commentId, userId) => async (dispatch) => {
  try {
    const res = await axios.patch(`${url}/${id}/comment/${commentId}/like`);
    dispatch({type: LIKE_COMMENT, payload: {commentId, likes: res.data, id}});
    if (userId) {
      dispatch(getProfileById(userId))
    } else {
      dispatch(getPosts())
    }
  } catch (error) {
    console.log(error)
  }
};

export const deleteComment = (id, commentId, userId) => async (dispatch) => {
  try {
    await axios.delete(`${url}/${id}/comment/${commentId}/`)
    dispatch({type: DELETE_COMMENT, payload: {id, commentId}})
    if (userId) {
      dispatch(getProfileById(userId))
    } else {
      dispatch(getPosts())
    }
  } catch (error) {
    console.log(error)
  }
}
