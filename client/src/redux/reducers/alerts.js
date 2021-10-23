
const alert = (state = [], action) => {
    const {type, payload} = action
    switch (type) {
        case "SET_ALERT":
            return {...state, payload}
            
        default:
            return state;
    }
}

export default alert