import axios from "axios"
import {EDIT_PROFILE, GET_PROFILE, PROFILE_ERROR} from "../type"
import {setAlert} from "./alerts"

//Get my profile

const url = "http://localhost:5000"

export const getProfile = () => async (dispatch) => {
    try {
        const res = await axios.get(`${url}/api/profile/me`)
        dispatch({type : GET_PROFILE, payload : res.data})
    } catch (error) {
        dispatch({type : PROFILE_ERROR})
    }
}

export const editProfile = (formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const res = await axios.patch(`${url}/api/profile/edit`, formData, config)
        dispatch({type: EDIT_PROFILE, payload: res.data})
        dispatch(setAlert("Update Profile", "success"))
    } catch (error) {
        dispatch({type : PROFILE_ERROR})
    }
}

export const getProfileById = (id) => async dispatch => {
    try {
        const res = await axios.get(`${url}/api/profile/${id}`)
        dispatch({type : GET_PROFILE, payload : res.data})
    } catch (error) {
        dispatch({type : PROFILE_ERROR})
    }
}