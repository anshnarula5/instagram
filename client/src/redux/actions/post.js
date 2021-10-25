import axios from "axios";
import { CREATE_POST, GET_POSTS, POST_ERROR } from "../type";
import { setAlert } from "./alerts";

const url = "http://localhost:5000/api/posts";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(`${url}`);
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (error) {
    dispatch({ type: POST_ERROR });
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
    dispatch({ type: POST_ERROR });
  }
};
