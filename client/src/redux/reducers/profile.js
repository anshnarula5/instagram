import {GET_PROFILE, PROFILE_ERROR} from "../type"

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error : {}
}

const profile = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case GET_PROFILE:
            return {...state, profile : payload, loading : false}
        case PROFILE_ERROR:
            return {...state, profile: null, loading : false, error : payload}
        default:
            return state
    }
}

export default profile