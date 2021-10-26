import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { follow } from "../../redux/actions/profile";
import { getProfile } from "../../redux/actions/profile";

const ProfileDetail = ({ profile }) => {
  const user = useSelector((state) => state.auth.user);
  const isFollowing = profile.followers.find(
    (follower) => follower === user._id
  );
  const dispatch = useDispatch();
  const handleFollow = () => {
    dispatch(follow(profile._id));
  };

  return (
    <>
      <div className="row w-75">
        
        <div className="col-md-5 col-sm-4 text-center mt-3">
          <img
            src={profile.user.profileImage}
            style={{ width: "10rem", borderRadius: "50%" }}
            alt=""
          />
        </div>
        <div className="col-md-7 col-sm-8 mt-3 d-flex flex-column">
          <div className="d-flex align-items-center">
            <p className="d-inline display-6 mr-md-3">{profile.user.username}</p>
            {profile.user._id === user._id ? (
              <Link className="btn btn-outline-dark mx-md-3" to="/profile/edit">
                Edit profile
              </Link>
            ) : isFollowing ? (
              <button
                className="btn btn-primary px-4 mx-3"
                onClick={handleFollow}
              >
                Follow
              </button>
            ) : (
                  <>
                  <button
                className="btn btn-outline-dark btn-sm px-2 mx-3"
              >
                message
              </button>
                  <button
                className="btn btn-outline-dark btn-sm px-3"
                onClick={handleFollow}
              >
                <i class="fas fa-user-check"></i>
              </button>
                  </>
            )}
            <p className="d-inline fs-5 mx-3">
              <i class="fas fa-cog"></i>
            </p>
          </div>
          <div className="my-3">
            <p className="d-inline mr-md-3 mr-2 ">
              <strong>{profile.posts.length}</strong> posts
            </p>
            <p className="d-inline mx-md-3 mx-2">
              <strong>{profile.followers.length}</strong> followers
            </p>
            <p className="d-inline">
              <strong>{profile.following.length}</strong> following
            </p>
          </div>
          <div>
            <p>
              <strong>{profile.user.fullname}</strong>
              <p>{profile.bio}</p>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetail;
