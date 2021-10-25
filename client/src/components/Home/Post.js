import React from "react";

const Post = ({ post }) => {
  return (
    <>
      <div class="card w-75 offset-2  mt-3  ">
        <section class="card-title mt-2 d-flex ">
          <div className="mx-1">
            <img
              src={post.user.profileImage}
              alt=""
              width="30rem"
              style={{ borderRadius: "50%", margin: "0px 8px" }}
            />{" "}
          </div>
          <div className="d-flex flex-column">
            <h6>{post.user.username}</h6>
            <small className="text-muted">{post?.location}</small>
          </div>
        </section>
        <img
          class="card-img-top"
          src={post.image}
          alt="Card image cap"
          style={{ maxHeight: "30rem", overflow: "hidden", display: "block" }}
        />
        <div class="card-body">
          <div className="d-flex justify-content-between">
            <p class="card-text fs-5">
              <i class="far fa-heart"></i>
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
              {" "}
              {post.text.length > 50
                ? post.text.slice(0, 50) + " " + "...Read more"
                : post.text}
            </small>
          </div>
          <small className="text-muted">
            {post.comments.length > 0 ? "View Comments" : "No comments"}
          </small>
        </div>
      </div>
    </>
  );
};

export default Post;
