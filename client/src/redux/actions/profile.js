import axios from "axios"
import {EDIT_PROFILE, FOLLOW, GET_PROFILE, PROFILE_ERROR, GET_ALL_PROFILES} from "../type"
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
export const getAllProfiles = () => async (dispatch) => {
    try {
        const res = await axios.get(`${url}/api/profile`)
        dispatch({type : GET_ALL_PROFILES, payload : res.data})
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
        dispatch(setAlert("Updated Profile", "success"))
    } catch (error) {
        dispatch({type : PROFILE_ERROR})
    }
}
export const editImage = (formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        await axios.patch(`${url}/api/auth/editImage`, formData, config)
        dispatch(setAlert("Updated Image", "success"))
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

export const follow = (id) => async (dispatch) => {
    try {
        const res = await axios.patch(`${url}/api/profile/${id}/follow`)
        dispatch({type: FOLLOW, payload: res.data})
        dispatch(getAllProfiles( ))
    } catch (error) {
        dispatch({type : PROFILE_ERROR})
    }
}
