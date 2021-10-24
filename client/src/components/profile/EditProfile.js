import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Redirect, useHistory} from "react-router";
import {Link} from "react-router-dom";
import { editProfile, getProfile } from "../../redux/actions/profile";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.profile);
  
  useEffect(() => {
    dispatch(getProfile());
    setFormData({
      username: loading || !profile.user ? "" : profile.user.username,
      fullname: loading || !profile.user ? "" :  profile.user.fullname,
      bio: loading || !profile.bio ? "" :  profile.bio,
      website: loading || !profile.website ? "" :  profile.website,
      email: loading || !profile.email ? "" :  profile.email,
      gender: loading || !profile.gender ? "" :  profile.gender,
    });
  }, [dispatch, loading]);
  const [formData, setFormData] = useState({
    username: "",
    fullname:"",
    bio: "",
    website: "",
    email: "",
    gender:"",
  });
  
  const { username, fullname, bio, website, email, gender } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(editProfile(formData))
  }
  if (loading) {
    return "...Loading";
  }
  return (
    <>
      <div className="row">
        <div className="col-md-6 offset-md-3 ">
          <div className="card my-5">
            <div className="card-body">
              <form className="px-4 py-5">
                <div class="form-group row mb-4">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">
                    <strong>Name</strong>
                  </label>
                  <div class="col-sm-10">
                    <input
                      type="text"
                      name="fullname"
                      class="form-control"
                      id="inputEmail3"
                      placeholder="Name"
                      value={fullname}
                      onChange={handleChange}
                    />
                    <small id="emailHelp" class="form-text text-muted">
                      Help people discover your account by using the name you're
                      known by: either your full name, nickname, or business
                      name.
                    </small>
                  </div>
                </div>
                <div class="form-group row mb-4">
                  <label for="inputPassword32" class="col-sm-2 col-form-label">
                    <strong>Username</strong>
                  </label>
                  <div class="col-sm-10">
                    <input
                      type="text"
                      name="username"
                      class="form-control"
                      id="inputPassword32"
                      placeholder="Username"
                      value={username}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class="form-group row mb-4">
                  <label for="inputPassword31" class="col-sm-2 col-form-label">
                    <strong>Website</strong>
                  </label>
                  <div class="col-sm-10">
                    <input
                      type="text"
                      name="website"
                      class="form-control"
                      id="inputPassword31"
                      placeholder="Website"
                      value={website}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class="form-group row mb-4">
                  <label for="inputPassword34" class="col-sm-2 col-form-label">
                    <strong>Bio</strong>
                  </label>
                  <div class="col-sm-10">
                    <textarea
                      type="text"
                      name="bio"
                      class="form-control"
                      id="inputPassword34"
                      placeholder="Write about yourself (Max 100 characters)"
                      maxLength = "100"
                      value={bio}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class="form-group row mb-4">
                  <label
                    for="inputPassword34"
                    class="col-sm-2 col-form-label"
                  ></label>
                  <div class="col-sm-10">
                    <small id="emailHelp" class="form-text text-muted">
                      <div className="text-dark">Personal Information</div>
                      Provide your personal information, even if the account is
                      used for a business, a pet or something else. This won't
                      be a part of your public profile.
                    </small>
                  </div>
                </div>
                <div class="form-group row mb-4">
                  <label for="inputPassword3s" class="col-sm-2 col-form-label">
                    <strong>Email</strong>
                  </label>
                  <div class="col-sm-10">
                    <input
                      type="text"
                      name="email"
                      class="form-control"
                      id="inputPassword3s"
                      placeholder="Email"
                      value={email}
                      onChange={handleChange}
                    />
                    <small id="emailHelp" class="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                </div>
                <div class="form-group row mb-4">
                  <label for="inputPassword3c" class="col-sm-2 col-form-label">
                    <strong>Gender</strong>
                  </label>
                  <div class="col-sm-10">
                    <input
                      type="text"
                      type="gender"
                      class="form-control"
                      id="inputPassword3c"
                      placeholder="Gender"
                      value={gender}
                      onChange={handleChange}
                    />
                    <small id="emailHelp" class="form-text text-muted">
                      We'll never share your identity with anyone else.
                    </small>
                  </div>
                </div>
                <div class="form-group row mb-4">
                  <label
                    for="inputPassword3c"
                    class="col-sm-2 col-form-label"
                  ></label>
                  <div class="col-sm-10">
                    <button  class="btn btn-primary" onClick = {handleSubmit}>
                      Submit
                    </button>
                    <Link to= "/profile/me"  class="btn btn-outline-primary mx-3">
                      Go back
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
