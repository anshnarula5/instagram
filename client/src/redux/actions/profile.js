import axios from "axios"
import {GET_PROFILE, PROFILE_ERROR} from "../type"

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