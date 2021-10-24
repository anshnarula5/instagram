import React, { useEffect } from "react";
import {
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";

import PrivateRoute from "./components/routing/PrivateRoute"

import "./App.css";
import Alert from "./components/layout/Alert";
import Home from "./components/Home/Home";
import Profile from "./components/profile/Profile";
import Auth from "./components/loginForm/Auth";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/auth";
import setAuthToken from "./utils/setAuthToken";
import EditProfile from "./components/profile/EditProfile";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  
  return (
    <BrowserRouter>
      <Navbar />
      <div className=" app">
        <div className="container">
          <Alert />
          <Switch>
          <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/auth" component={Auth} />
            <Route exact path="/profile/me" component={Profile} />
            <Route exact path="/profile/edit" component={EditProfile} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
