import { combineReducers } from "redux";

import alert from "./alerts"
import auth from "./auth"
import profile from "./profile"

const rootReducer = combineReducers({alert, auth, profile})

export default rootReducer