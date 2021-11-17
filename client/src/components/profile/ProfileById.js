import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearProfile, getProfileById } from "../../redux/actions/profile";
import ProfileDetail from "./ProfileDetail";
import ProfilePost from "./ProfilePost";

const ProfileById = ({match}) => {
  const dispatch = useDispatch()

  const {profile, loading} = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(clearProfile())
    dispatch(getProfileById(match.params.id))
    return () => dispatch(clearProfile())
  }, [dispatch, match.params.id])
  return (
    <>
      {loading ? (
       <div className = "pt-5"><div className="loader py-5"></div></div>
      ) : (
        <div className="w-75 offset-md-2 d-flex flex-column">
         {profile ?  <ProfileDetail profile={profile}/> : <div className = "pt-5"><div className="loader py-5"></div></div>}
            <hr className="w-75" />
            {profile  ? <ProfilePost  profile={profile}/> : <div className = "pt-5"><div className="loader py-5"></div></div>}
        </div>
      )}
    </>
  );
};

export default ProfileById;
