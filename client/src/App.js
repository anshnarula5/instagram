import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

import "./App.css";
import Login from "./components/loginForm/Login";
import Alert from "./components/layout/Alert";

function App() {
  return (
    <Router>
      <Navbar />
      <div className=" app">
        <div className="container">
          {/* <Alert /> */}
        <Switch>
          <Route exact path="/login" component={Login}/>
        </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
