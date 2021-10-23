
export const setAlert = (message, type) => dispatch => {
    const id = Math.random()
    dispatch({type : "SET_ALERT", payload : {message, type, id}})
}