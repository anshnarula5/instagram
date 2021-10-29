import React, { useEffect } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import PrivateRoute from "./components/routing/PrivateRoute";


import "./App.css";
import Alert from "./components/layout/Alert";
import Home from "./components/Home/Home";
import Profile from "./components/profile/Profile";
import Auth from "./components/loginForm/Auth";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/auth";
import setAuthToken from "./utils/setAuthToken";
import EditProfile from "./components/profile/EditProfile";
import CreatePost from "./components/Home/CreatePost";

import ProfileById from "./components/profile/ProfileById"
import Explore from "./components/Home/Explore";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const {isAuthenticated, loading }= useSelector(state => state.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      {isAuthenticated && !loading && <Navbar />}
      <div className=" app">
        <div className="container ">
          <Alert />
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/auth" component={Auth} />
            <PrivateRoute exact path="/profile/me" component={Profile} />
            <PrivateRoute exact path="/profile/edit" component={EditProfile} />
            <PrivateRoute exact path="/create" component={CreatePost} />
            <PrivateRoute exact path={`/profile/:id`} component={ProfileById} />
            <PrivateRoute exact path="/explore" component={Explore} />
            <Redirect to ="/" />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
