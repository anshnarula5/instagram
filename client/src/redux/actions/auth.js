import axios from "axios";
import {setAlert} from "./alerts";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "../type";

export const register = formData => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("http://localhost:5000/api/user", formData, config);
      dispatch({type: REGISTER_SUCCESS, payload: res.data});
      dispatch(setAlert("Registeration successful", "success"))
  } catch (error) {
      const errors = error.response.data.errors;
      console.log(error)
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
      }
    dispatch({ type: REGISTER_FAIL });
  }
};
