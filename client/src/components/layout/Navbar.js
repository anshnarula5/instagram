import React from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import logo from "../../img/logo1.png"
import {logout} from "../../redux/actions/auth";

const Navbar = () => {
  const dispatch = useDispatch()

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-white static-top border-bottom">
        <div class="container w-50">
          <Link class="navbar-brand " to="/">
            <img
              src={logo}
              alt="..."
              height="36"
            />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item fs-4 mx-1">
                <Link class="nav-link active" aria-current="page" to="/">
                <i class="fas fa-home"></i>
                </Link>
              </li>
              <li class="nav-item fs-4 mx-1">
                <Link class="nav-link active" aria-current="page" to="/auth">
                <i class="far fa-comment-dots"></i>
                </Link>
              </li>
              <li class="nav-item fs-4 mx-1">
                <Link class="nav-link active" aria-current="page" to="/create">
                <i class="far fa-plus-square"></i>
                </Link>
              </li>
              <li class="nav-item fs-4 mx-1">
                <Link class="nav-link active" aria-current="page" to="/explore">
                <i class="far fa-compass"></i>
                </Link>
              </li>
              <li class="nav-item fs-4 mx-1">
                <Link class="nav-link active" aria-current="page" to="/">
                <i class="far fa-heart"></i>
                </Link>
              </li>
              
                 
              <li class="nav-item dropdown fs-4 mx-1" >
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="far fa-user"></i>
                </a>
                <ul
                  class="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <Link class="dropdown-item" to="/profile/me">
                      profile
                    </Link>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <p class="dropdown-item" onClick = {() => dispatch(logout())} style = {{cursor : "pointer"}}>
                      Logout
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
