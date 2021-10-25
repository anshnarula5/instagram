import { combineReducers } from "redux";

import alert from "./alerts"
import auth from "./auth"
import profile from "./profile"
import post from "./post"

const rootReducer = combineReducers({alert, auth, profile, post})

export default rootReducer