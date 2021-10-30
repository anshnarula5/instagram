import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/actions/post";
import {getProfile} from "../../redux/actions/profile";
import Post from "./Post/Post";

import Profiles from "./Profiles"

const Posts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  let { posts, loading } = useSelector((state) => state.post);
  const { profile, profileLoading } = useSelector((state) => state.profile);

  if (loading ) return <div className = "pt-5"><div className="loader py-5"></div></div>;
  if (profileLoading ) return <div className = "pt-5"><div className="loader py-5"></div></div>;

  let filteredPosts = [];

  if (profile?.following && profile?.following.length > 0) {
    profile.following.forEach((following) =>
      posts.map((post) =>
        post.user._id === following
          ? filteredPosts.push(post)
          : console.log("nope")
      )
    );
  }


  if (filteredPosts && filteredPosts.length > 0 && !loading && !profileLoading) {
    return filteredPosts.map((post) => <Post key={post._id} post={post} />);
  }
  return  <Profiles />;
};

export default Posts;
