import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/actions/profile";
import ProfileDetail from "./ProfileDetail";

const Profile = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, []);
  const { profile, loading } = useSelector((state) => state.profile);
  console.log(profile);
  
  return (
    <>
      {loading ? (
        "...loading"
      ) : (
        <div className="w-75 offset-md-2">
          <ProfileDetail profile={profile} />
        </div>
      )}
    </>
  );
};

export default Profile;
