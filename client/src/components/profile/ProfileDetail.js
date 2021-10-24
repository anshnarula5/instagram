import React from "react";
import {Link} from "react-router-dom";

const ProfileDetail = ({ profile }) => {
  return (
    <>
      <div className="row w-75">
        <div className="col-md-5 col-sm-4 text-center mt-5">
          <img
            src={profile.user.profileImage}
            style={{ width: "10rem", borderRadius: "50%" }}
            alt=""
          />
        </div>
        <div className="col-md-7 col-sm-8 mt-3 d-flex flex-column justify-content-around">
          <div>
            <p className="d-inline display-6 mx-3">{profile.user.username}</p>
            <Link className="btn btn-outline-dark mx-3" to ="/profile/edit">Edit profile</Link>
            <p className="d-inline fs-4 mx-3">
              <i class="fas fa-cog"></i>
            </p>
          </div>
          <div>
            <p className="d-inline mx-3">
              <strong>{profile.posts.length}</strong> posts
            </p>
            <p className="d-inline mx-3">
              <strong>{profile.followers.length}</strong> followers
            </p>
            <p className="d-inline mx-3">
              <strong>{profile.following.length}</strong> following
            </p>
          </div>
          <div>
            <p className="mx-4">
              <strong>{profile.user.fullname}</strong>
            </p>
                      <p className="lead">{profile.bio}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetail;
