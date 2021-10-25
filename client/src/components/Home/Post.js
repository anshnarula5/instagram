import React, { useState } from "react";
import {useDispatch} from "react-redux"

import moment from "moment"

import {likePost} from "../../redux/actions/post";
const Post = ({ post }) => {
  const [showText, setShowText] = useState(false);
  const dispatch = useDispatch()
  const handleLike = () => {
    dispatch(likePost(post._id))
  }
  return (
    <>
      <div class="card w-75 offset-2  my-2  ">
        <section class="card-title mt-2 d-flex ">
          <div className="mx-1">
            <img
              src={post.user.profileImage}
              alt=""
              width="30rem"
              className="postImage"
              style={{ borderRadius: "50%", margin: "0px 8px" }}
            />{" "}
          </div>
          <div className="d-flex flex-column">
            <h6>{post.user.username}</h6>
            <small className="text-muted">{post?.location}</small>
          </div>
        </section>
        <img
          class="card-img-top postImage"
          src={post.image}
          alt="Card image cap"
          style={{ maxHeight: "30rem", overflow: "hidden", display: "block" }}
        />
        <div class="card-body">
          <div className="d-flex justify-content-between">
            <p class="card-text fs-5">
              <i class="far fa-heart" onClick = {handleLike}></i>
              <i class="far fa-comment mx-3"></i>
              <i class="far fa-paper-plane"></i>
            </p>
            <p class="card-text fs-5">
              <i class="far fa-bookmark"></i>
            </p>
          </div>
          <p className="mt-1">
            <b>{post.likes.length}</b> likes
          </p>
          <div>
            <b>{post.user.username}</b>{" "}
            <small>
              {showText
                ? post.text
                : post.text.length > 50
                ? post.text.slice(0, 50)
                  : post.text}
              {!showText && post.text.length > 50 && <small className = "text-muted d-block" style = {{cursor : "pointer"}} onClick={() => setShowText(true)}>...Read more</small>}
            </small>
          </div>
          <small className="text-muted">
            {post.comments.length > 0 ? "View Comments" : "No comments"}
          </small>
          <small><small className="text-muted d-block">{moment().startOf(post.date).fromNow()}</small></small>
        </div>
      </div>
    </>
  );
};

export default Post;
