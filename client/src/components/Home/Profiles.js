import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, getAllProfiles } from "../../redux/actions/profile";

const Profiles = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProfiles());
  }, [dispatch]);
  let { profiles, loading, profile } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  profiles = profiles.filter((p) => p._id !== profile._id);
  if (loading) return "...Loading";
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
                  <img
                    style={{ borderRadius: "50%" }}
                    src={profile.user.profileImage}
                    width="40rem"
                    alt=""
                  />
                  <div className="flex-grow-1 mx-3">
                    <h6 className=" d-inline">{profile.user.username}</h6>
                    <small className="text-muted d-block">
                      {profile.user.fullname}
                    </small>
                  </div>
                  {profile.followers.find(
                    (follower) => follower === user._id
                  ) ? (
                    <>
                      <div
                        class="modal fade"
                        id="exampleModal"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-sm modal-dialog-centered">
                          <div class="modal-content ">
                            <div class=" d-flex flex-column mt-3 align-items-center justify-content-center">
                              <img
                                style={{ borderRadius: "50%" }}
                                src={profile.user.profileImage}
                                width="80rem"
                                alt=""
                              />
                              <p className="my-3">
                                Unfollow @{profile.user.username} ?
                              </p>
                            </div>
                            <hr />
                            <div class="text-center text-danger my-2">
                              <p>Unfollow</p>
                            </div>{" "}
                            <hr />
                            <div class="text-center my-2">
                              <p data-bs-dismiss="modal">Close</p>
                            </div>{" "}
                            <hr />
                          </div>
                        </div>
                      </div>
                      <button
                        className="btn btn-outline-dark"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => {
                          dispatch(follow(profile._id));
                        }}
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
