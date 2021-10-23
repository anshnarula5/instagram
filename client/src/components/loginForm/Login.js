import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Redirect} from "react-router";
import { setAlert } from "../../redux/actions/alerts";
import {register} from "../../redux/actions/auth";

const Login = () => {
  const [login, setLogin] = useState(true);
  const dispatch = useDispatch();

  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    fullname: "",
  });
  const {email, password, username, fullname} = formData;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (login) {
      if (!email || !password) {
        dispatch(setAlert("Please enter correct details", "danger"));
        return;
      }
    }
    else {
      if (!email || !password || !username || !fullname) {
        dispatch(setAlert("Please enter correct details", "danger"));
        return;
      }
      dispatch(register(formData))
    }
    
  };
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  if (isAuthenticated) {
    return <Redirect to = "/"/>
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="row">
        <div className="col-md-4 mt-5 offset-md-4">
          <div className="card p-5">
            <form>
              <div className="mb-5">
                <a title="Instagram / Mackey Saturday, Public domain, via Wikimedia Commons">
                  <img
                    style={{ width: "19rem" }}
                    alt="Instagram logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/256px-Instagram_logo.svg.png"
                  />
                </a>
              </div>
              <div class=" my-2">
                <input
                  type="email"
                  name="email"
                  class="form-control bg-light"
                  placeholder="Email"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>
              {!login && (
                <>
                  {" "}
                  <div class=" my-2">
                    <input
                      type="text"
                      name="username"
                      class="form-control bg-light"
                      required
                      placeholder="Username"
                      value={username}
                      onChange={handleChange}
                    />
                  </div>
                  <div class=" my-2">
                    <input
                      type="text"
                      name="fullname"
                      class="form-control bg-light"
                      placeholder="Fullname"
                      required
                      value={fullname}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              <div class=" my-1">
                <input
                  type="password"
                  name="password"
                  class="form-control bg-light"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={handleChange}
                />
              </div>
            </form>
            <button
              class="btn btn-primary mt-3 btn-block"
              onClick={handleSubmit}
            >
              {login ? "Sign in" : "Register"}
            </button>
          </div>
          <div className="card mt-3 text-center px-5 py-3">
            {login ? (
              <>
                Don't have an account?
                <span
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => setLogin(!login)}
                >
                  Sign Up
                </span>{" "}
              </>
            ) : (
              <>
                Already have an account?
                <span
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => setLogin(!login)}
                >
                  Sign In
                </span>{" "}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
