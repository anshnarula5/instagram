import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileById } from "../../redux/actions/profile";
import ProfileDetail from "./ProfileDetail";
import ProfilePost from "./ProfilePost";

const ProfileById = ({match}) => {
  const dispatch = useDispatch()
  const {profile, loading} = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getProfileById(match.params.id))
  }, [dispatch, match.params.id])

  return (
    <>
      {loading ? (
        "...loading"
      ) : (
        <div className="w-75 offset-md-2 d-flex flex-column">
          <ProfileDetail profile={profile} />
            <hr className="w-75" />
            <ProfilePost  profile={profile} />
        </div>
      )}
    </>
  );
};

export default ProfileById;
