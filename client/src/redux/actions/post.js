import axios from "axios";
import { CREATE_POST, DELETE_POST, GET_POSTS, LIKE_POST, POST_ERROR } from "../type";
import { setAlert } from "./alerts";

const url = "http://localhost:5000/api/posts";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(`${url}`);
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (error) {
    dispatch({ type: POST_ERROR, payload : {msg : error.response.statusText, status : error.response.status} });
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
    dispatch({ type: CREATE_POST, payload: res.data });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({ type: POST_ERROR, payload : {msg : error.response.statusText, status : error.response.status} });
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const res = await axios.patch(`${url}/${id}/like`);
    dispatch({ type: LIKE_POST, payload : {id, likes : res.data} });
  } catch (error) {
    dispatch({ type: POST_ERROR, payload : {msg : error.response.statusText, status : error.response.status} });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${url}/${id}`)
    dispatch({type : DELETE_POST, payload : id})
    dispatch(setAlert("Deleted post", "success"))
  } catch (error) {
  }
}