import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";

import { comment, deletePost, likePost } from "../../../redux/actions/post";
import { Link } from "react-router-dom";
import Modal from "./Modal";
const Post = ({ post }) => {
  const [showText, setShowText] = useState(false);
  const [text, setText] = useState("");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleLike = () => {
    dispatch(likePost(post._id));
  };
  const handleDelete = () => {
    dispatch(deletePost(post._id));
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleComment = () => {
    dispatch(comment(post._id, { text }));
    setText("");
  };
  return (
    <>
      <div class="card w-75 offset-2  my-2  ">
        <div
          class="modal fade "
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-dialog-centered"
            style={{ cursor: "pointer" }}
          >
            <div class="modal-content text-center w-75">
              {post.user._id === user._id ? (
                <>
                  <div
                    className="my-2 text-danger"
                    data-bs-dismiss="modal"
                    onClick={handleDelete}
                  >
                    Delete post
                  </div>
                  <hr />
                  <div className="my-2 ">Edit post</div>
                  <hr />
                </>
              ) : (
                <>
                  <div className="my-2 text-danger">Unfollow</div>
                  <hr />
                </>
              )}
              <div className="my-2">Open post</div>
              <hr />
              <div className="my-2">Open post</div>
              <hr />
              <div className="my-2" data-bs-dismiss="modal">
                Close
              </div>
            </div>
          </div>
        </div>
       
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
              <div
                class="modal-body"
                style={{ padding: "0%", margin: "0%", borderRadius: "0%" }}
              >
                <div className="card">
                  <div class="row no-gutters">
                    <div class="col-md-8"  >
                      <img
                        src={post.image}
                        class="card-img"
                        alt="..."
                        style={{ borderRadius: "0%" }}
                      />
                    </div>
                    <div class="col-md-4 d-flex flex-column justify-content-between"  >
                      <div className="">
                        <section className = "py-3 border-bottom d-flex justify-content-between">
                          <section>
                          <img style = {{borderRadius : "50%"}} src={post.user.profileImage} width = "30rem" alt="" />
                          <strong className = "mx-3">{post.user.username}</strong>
                          </section>
                          <p>actions</p>
                        </section>
                        <div className="commentsection">
                          {post.text && <div className="py-2">
                            <img style={{borderRadius: "50%"}} src={post.user.profileImage} width="30rem" alt="" />
                            <strong className="mx-3">{post.user.username}</strong> {post.text}
                          </div>}
                          {post.comments.map(comment =>
                            <div className="py-3 d-flex justify-content-between">
                              <section>
                              <img src={comment.profileImage} style = {{borderRadius : "50%"}} width = "30rem" alt="" />
                                  <b className="mx-2">{comment.username}</b>
                                {comment.text}
                              </section>
                              <section className = "px-2"><i class="far fa-heart"></i></section>
                            </div>)}
                      </div>
                      </div>
                      <div className="">
                      <section>
                        actions
                        likes
                      </section>
                      <section>
                        addComment
                      </section>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section class="card-title mt-2 d-flex align-items-center justify-content-between ">
          <div className=" d-flex align-items-center">
            <Link
              to={
                post.user._id === user._id
                  ? "/profile/me"
                  : `/profile/${post.user._id}`
              }
              className="mx-1"
            >
              <img
                src={post.user.profileImage}
                alt=""
                width="30rem"
                className="postImage"
                style={{ borderRadius: "50%", margin: "0px 8px" }}
              />
            </Link>
            <div className="d-flex flex-column">
              <Link
                to={
                  post.user._id === user._id
                    ? "/profile/me"
                    : `/profile/${post.user._id}`
                }
                style={{ textDecoration: "none", color: "black" }}
              >
                <h6>{post.user.username}</h6>
              </Link>
              <small className="text-muted">{post?.location}</small>
            </div>
          </div>
          <i
            class="fas fa-ellipsis-h mx-3"
            style={{ cursor: "pointer" }}
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          ></i>
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
              <i
                class="far fa-heart"
                onClick={handleLike}
                style={{ cursor: "pointer" }}
              ></i>
              <i class="far fa-comment mx-3" style={{ cursor: "pointer" }}></i>
              <i class="far fa-paper-plane" style={{ cursor: "pointer" }}></i>
            </p>
            <p class="card-text fs-5">
              <i class="far fa-bookmark" style={{ cursor: "pointer" }}></i>
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
              {!showText && post.text.length > 50 && (
                <small
                  className="text-muted d-block"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowText(true)}
                >
                  ...Read more
                </small>
              )}
            </small>
          </div>
          <small className="text-muted">
              <p
                style={{ cursor: "pointer" }}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                View Comments
              </p>
            
          </small>
          <small>
            <small className="text-muted d-block">
              {moment(post.date).fromNow()}
            </small>
          </small>
        </div>
        <section class="border-top">
          <ul class="list-group list-group-flush d-flex flex-row align-items-center justify-content-between">
            <input
              class="list-group-item w-100"
              placeholder="Add comment"
              name="comment"
              value={text}
              style={{ borderBottom: "none" }}
              onChange={handleChange}
            ></input>
            <p
              className="px-2 text-primary"
              style={{ cursor: "pointer" }}
              onClick={handleComment}
            >
              share
            </p>
          </ul>
        </section>
      </div>
    </>
  );
};

export default Post;
