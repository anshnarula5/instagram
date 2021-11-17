import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProfiles, getProfile } from "../../redux/actions/profile";
import Posts from "./Posts";
import Profiles from "./Profiles";
import Right from "./Right";

const Home = () => {
  const { profile, loading } = useSelector((state) => state.profile);
  const { posts, postLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  if (loading)
    return (
      <div className="pt-5">
        <div className="loader py-5"></div>
      </div>
    );
  if (postLoading)
    return (
      <div className="pt-5">
        <div className="loader py-5"></div>
      </div>
    );
  return (
    <>
      {profile?.following && profile?.following.length > 0 && (
        <div className="w-75 offset-md-1">
          <div className="row">
            <div className="col-md-8 mt-4 ">
              <Posts />
            </div>
            <div className="col-md-4 mt-4 " style={{ zIndex: "0" }}>
              <div className="sticky-top" style={{ top: "2rem" }}>
                <Right profile={profile} />
              </div>
            </div>
          </div>
        </div>
      )}
      {!postLoading && 
        <div className="row">
          <div className="col-md-8 offset-md-2 mt-4 ">
            <Profiles />
          </div>
        </div>
      }
    </>
  );
};

export default Home;
