import React from "react";
import PostElement from "./PostElement";
import "./ProfilePost.css";

const ProfilePost = ({profile}) => {
    const posts = profile?.posts
   
  return (
    <>
      
      <div className="row w-75">
        { !posts && posts.length === 0
          ? "No posts"
          : posts.map((post) => (
            <PostElement post={post} key={post._id} profile={profile} myProfile={true}/>
            ))}
      </div>
    </>
  );
};

export default ProfilePost;
