import React from "react";

import "./ProfilePost.css";

const ProfilePost = ({profile}) => {
    const posts = profile?.posts
  return (
    <>
      <div className="row w-75">
        { !posts && posts.length === 0
          ? "No posts"
          : posts.map((post) => (
              <div className="col-4 px-4 my-2">
                <img
                  className="post"
                  src={post.image}
                  alt=""
                />
              </div>
            ))}
      </div>
    </>
  );
};

export default ProfilePost;
