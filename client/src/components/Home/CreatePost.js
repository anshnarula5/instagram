import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Redirect} from "react-router";
import {createPost, getPosts} from "../../redux/actions/post";

const CreatePost = () => {
  const {user, loading} = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    image: "",
    text: "",
    location: "",
  });
  const [posted, setPosted] = useState(false)
  const { image, text, location } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {  
    dispatch(createPost(formData))
    
    setPosted(true)
  }
  if (posted && !loading) {
    return <Redirect to ="/"/>
  }
  return (
    <div className="row ">
      <div class="card mt-5 w-75 offset-md-1">
        <div className="text-center mt-3">Create a post</div>
        <hr />
        <div class="row no-gutters ">
          <div class="col-md-8">
            <form class="md-form">
              <div class="file-field">
                <div class="z-depth-1-half mb-4">
                  {image ? (
                    <img src={image} class="img-fluid virtual" alt="example " />
                  ) : (
                    <img
                      src="https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"
                      class="img-fluid virtual"
                      alt="example placeholder"
                    />
                  )}
                </div>
                <div class="d-flex justify-content-center">
                  <div class="btn btn-mdb-color btn-rounded float-left">
                    <textarea
                      className="list-group-item "
                      type="text"
                      name="image"
                      placeholder="Add image"
                      onChange={handleChange}
                      value={image}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="col-md-4 ">
            {loading ? (
              "...loading"
            ) : (
              <h5 class="card-title">
                <img
                  src={user.profileImage}
                  alt=""
                  width="25rem"
                  style={{ borderRadius: "50%" }}
                />{" "}
                {user.username}
              </h5>
            )}
            <ul class="list-group list-group-flush">
              <textarea
                class="list-group-item"
                rows="8"
                name="text"
                placeholder="Write a caption"
                onChange={handleChange}
                value={text}
              ></textarea>
              <input
                class="list-group-item "
                placeholder="Add location"
                onChange={handleChange}
                name="location"
                value={location}
              ></input>
              <button className="btn btn-primary mt-3" onClick = {handleSubmit}>Add post</button>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-md-8"></div>
    </div>
  );
};

export default CreatePost;
