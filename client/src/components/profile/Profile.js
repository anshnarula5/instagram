import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/actions/profile";
import ProfileDetail from "./ProfileDetail";

const Profile = () => {
  const { profile, loading } = useSelector((state) => state.profile);
  return (
    <>
      {loading ? (
        "...loading"
      ) : (
        <div className="w-75 offset-md-2 d-flex flex-column">
          <ProfileDetail profile={profile} />
          <hr className = "w-75"/>
        </div>
      )}
    </>
  );
};

export default Profile;