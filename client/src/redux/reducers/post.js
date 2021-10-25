import {CREATE_POST, GET_POSTS, POST_ERROR} from "../type"

const initialState = {
    post: null,
    posts: [],
    loading : true
}

const post = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case GET_POSTS:
            return {...state, posts: payload, loading: false}
        case CREATE_POST:
            return {...state, post : payload, loading : false}
        case POST_ERROR:
            return {...state, posts: [], post: null, loading: false}
        default:
            return state
    }
}

export default post