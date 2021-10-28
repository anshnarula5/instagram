import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/actions/post";
import {getProfile} from "../../redux/actions/profile";
import Post from "./Post/Post";

import Profiles from "./Profiles"

const Posts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile())
    dispatch(getPosts());
  }, [dispatch]);
  let { posts, loading } = useSelector((state) => state.post);
  const { profile, profileLoading } = useSelector((state) => state.profile);

  if (loading ) return "..loading";
  if (profileLoading ) return "..loading";

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

    const myPosts = posts.filter((post) => post?.user._id === profile.user._id);

    console.log(myPosts)
    

  if (filteredPosts && filteredPosts.length > 0) {
    return filteredPosts.map((post) => <Post key={post._id} post={post} />);
  }
  return  <Profiles />;
};

export default Posts;
