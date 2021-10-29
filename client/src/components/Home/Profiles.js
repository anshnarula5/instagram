import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, getAllProfiles } from "../../redux/actions/profile";
import { Link } from "react-router-dom";
const Profiles = () => {
  let { profiles, loading, profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProfiles());
  }, [dispatch]);
   const { user } = useSelector((state) => state.auth);
  if (loading) return <div className = "pt-5"><div className="loader py-5"></div></div>;
 
  profiles = profiles.filter((p) => p?._id !== profile?._id)
  return (
    <>
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <h4 className="mb-2">Suggestions for you</h4>
          <div className="card">
            {!loading &&
              profiles.map((profile) => (
                <div
                  key={profile._id}
                  className="d-flex p-3 justify-content-between align-items-center"
                >
                  <Link
                    to={`/profile/${profile.user._id}` }
                    className="mx-1"
                  ><img
                  style={{ borderRadius: "50%", objectFit : "cover" }}
                  width="40rem"
                  height="40rem"
                  src={profile.user.profileImage}
                  alt=""
                /></Link>
                  <div className="flex-grow-1 mx-3">
                  <Link
                    to={`/profile/${profile.user._id}` }
                      className="mx-1"
                      
                  >
                    <h6 className=" d-inline">{profile.user.username}</h6> 
                    </Link>
                    <small className="text-muted d-block">
                      {profile.user.fullname}
                    </small>
                  </div>
                  {profile.followers.find(
                    (follower) => follower === user._id
                  ) ? (
                    <>
                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-sm modal-dialog-centered">
                          <div className="modal-content ">
                            <div className=" d-flex flex-column mt-3 align-items-center justify-content-center">
                              <img
                                style={{ borderRadius: "50%", objectFit : "cover" }}
                                width="80rem"
                                height="80rem"
                                src={profile.user.profileImage}
                                alt=""
                              />
                              <p className="my-3">
                                Unfollow @{profile.user.username} ?
                              </p>
                            </div>
                            <hr />
                            <div className="text-center text-danger my-2">
                              <p style = {{cursor : "pointer"}}  data-bs-dismiss="modal"  onClick={() => {
                                dispatch(follow(profile._id));
                                
                                }} >Unfollow</p>
                            </div>{" "}
                            <hr />
                            <div className="text-center my-2">
                              <p style = {{cursor : "pointer"}} data-bs-dismiss="modal">Close</p>
                            </div>{" "}
                            <hr />
                          </div>
                        </div>
                      </div>
                      <button
                        className="btn btn-outline-dark"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                       
                      >
                        following
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        dispatch(follow(profile._id));
                      }}
                    >
                      Follow
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profiles;
