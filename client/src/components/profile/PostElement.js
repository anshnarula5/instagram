import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  comment,
  likeComment,
  likePost,
  deleteComment,
} from "../../redux/actions/post";

const PostElement = ({ post, profile }) => {
  const [text, setText] = useState("");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleLike = () => {
    dispatch(likePost(post._id, user._id));
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleComment = () => {
    dispatch(comment(post._id, { text }, user._id));
    setText("");
  };
  return (
    <>
      <div
        class="modal fade"
        id={`body${post._id}`}
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
                  <div class="col-md-8">
                    <img
                      src={post.image}
                      class="card-img"
                      alt="..."
                      style={{
                        height: "35rem",
                        overflow: "hidden",
                        display: "block",
                        objectFit: "cover",
                        borderRadius: "0%",
                      }}
                    />
                  </div>
                  <div class="col-md-4 d-flex flex-column justify-content-between">
                    <div className="">
                      <section className="py-3 border-bottom d-flex justify-content-between">
                        <section>
                          <img
                            style={{ borderRadius: "50%" }}
                            src={profile.user.profileImage}
                            width="30rem"
                            alt=""
                          />
                          <strong className="mx-3">
                            {profile.user.username}
                          </strong>
                        </section>
                        <p>actions</p>
                      </section>
                      <div className="commentsection">
                        {post.text && (
                          <div className="py-2">
                            <img
                              style={{ borderRadius: "50%" }}
                              src={post.user.profileImage}
                              width="30rem"
                              alt=""
                            />
                            <strong className="mx-3">
                              {post.user.username}
                            </strong>{" "}
                            {post.text}
                          </div>
                        )}
                        {post.comments.map((comment) => (
                          <div className="py-3 d-flex justify-content-between">
                            <section>
                              <img
                                src={comment.profileImage}
                                style={{ borderRadius: "50%" }}
                                width="30rem"
                                alt=""
                              />
                              <b className="mx-2">{comment.username}</b>
                              {comment.text}
                              <section className="text-muted ">
                                <small>
                                  <small>
                                    {moment(comment.date).fromNow(true)}
                                  </small>
                                </small>
                                <small className="mx-2">
                                  <small>{comment.likes.length} Likes</small>
                                </small>
                                {user.username === comment.username && (
                                  <small style={{ cursor: "pointer" }}>
                                    <small
                                      onClick={() =>
                                        dispatch(
                                          deleteComment(post._id, comment._id, user._id)
                                        )
                                      }
                                    >
                                      Delete
                                    </small>
                                  </small>
                                )}
                              </section>
                            </section>
                            <section
                              className="px-2"
                              onClick={() =>
                                dispatch(likeComment(post._id, comment._id, user._id))
                              }
                            >
                              {!comment.likes.find(
                                (like) => like._id === user._id
                              ) ? (
                                <i
                                  class="far fa-heart"
                                  style={{ cursor: "pointer" }}
                                ></i>
                              ) : (
                                <i
                                  class="fas fa-heart"
                                  style={{
                                    color: "#fb3958",
                                    cursor: "pointer",
                                  }}
                                ></i>
                              )}
                            </section>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="border-top pt-1">
                      <section>
                        <div className="d-flex justify-content-between">
                          <p class="card-text fs-5 pb-1">
                            {!post.likes.find(
                              (like) => like.user === user._id
                            ) ? (
                              <i
                                class="far fa-heart"
                                onClick={handleLike}
                                style={{ cursor: "pointer" }}
                              ></i>
                            ) : (
                              <i
                                class="fas fa-heart"
                                onClick={handleLike}
                                style={{ cursor: "pointer", color: "#fb3958" }}
                              ></i>
                            )}
                            <i
                              class="far fa-comment mx-3"
                              style={{ cursor: "pointer" }}
                            ></i>
                            <i
                              class="far fa-paper-plane"
                              style={{ cursor: "pointer" }}
                            ></i>
                          </p>
                          <p class="card-text fs-5 px-2">
                            <i
                              class="far fa-bookmark"
                              style={{ cursor: "pointer" }}
                            ></i>
                          </p>
                        </div>
                        <small className="py-1">
                          <b>{post.likes.length}</b> likes
                        </small>
                        <small>
                          <small className="text-muted d-block mb-2">
                            {moment(post.date).fromNow()}
                          </small>
                        </small>
                      </section>
                      <section class="border-top py-1">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="col-4 px-4 my-2  profilepost "
        data-bs-toggle="modal"
        style={{ cursor: "pointer" }}
        data-bs-target={`#body${post._id}`}
      >
        <img className="post" src={post.image} alt="" />
        <div className="over ">
          <div className="buttons fs-6 text-white ">
            <div className=" d-inline">
              <i class="fas fa-heart mx-1"></i>
              {post.likes.length}
            </div>
            <div className="px-3 d-inline">
              <i class="fas fa-comment mx-1"></i>
              {post.comments.length}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostElement;
