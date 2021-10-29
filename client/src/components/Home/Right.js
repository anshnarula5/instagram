import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, getAllProfiles, getProfile } from "../../redux/actions/profile";

const Right = () => {
  let { profile, profiles, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProfiles());
  }, [dispatch]);
  const { user } = useSelector((state) => state.auth);
  if (loading) return <div className = "pt-5"><div className="loader py-5"></div></div>;
  profiles = profiles.filter((p) => p?._id !== profile?._id);

  if (profile?.following && profile?.following.length > 0) {
    profile.following.forEach((following) =>
      profiles.map((profile) =>
      profile.user._id === following
          ? profiles.splice(profiles.indexOf(following), 1)
          : console.log("nope")
      )
    );
  }

  return (
    <>{loading && <div className = "pt-5"><div className="loader py-5"></div></div>}
      {!loading && <>
      <section className="d-flex align-items-center justify-content-between" >
        <img
          style={{ borderRadius: "50%", objectFit : "cover" }}
          width="50rem"
          height="50rem"
          src={profile?.user.profileImage}
          alt=""
        />
        <h6 className=" d-inline mx-2 flex-grow-1">{profile?.user.username}</h6>
        <p>Logout</p>
      </section>
      <section className="mt-4">
        <small className="text-muted mb-2">Suggestions for you</small>
        <section>
          {!loading &&
            profiles.map((profile) => (
              <div
                key={profile._id}
                className="d-flex py-2 justify-content-between align-items-center"
              >
                <img
                  style={{ borderRadius: "50%", objectFit : "cover" }}
                  width="40rem"
                  height="40rem"
                  src={profile?.user.profileImage}
                  alt=""
                />
                <div className="flex-grow-1 mx-2">
                  <h6 className=" d-inline ">{profile.user.username}</h6>
                  <small className="text-muted d-block">
                    {profile.user.fullname}
                  </small>
                </div>
                {profile.followers.find((follower) => follower === user._id) ? (
                  <>
                    <p
                      style={{ cursor: "pointer" }}
                      data-bs-dismiss="modal"
                      onClick={() => {
                        dispatch(follow(profile._id));
                      }}
                    >
                      Unfollow
                    </p>
                  </>
                ) : (
                  <p
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      dispatch(follow(profile._id));
                    }}
                  >
                    Follow
                  </p>
                )}
              </div>
            ))}
        </section>
      </section>
      </>
      }
    </>
  );
};

export default Right;
