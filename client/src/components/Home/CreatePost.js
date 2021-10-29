import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Redirect} from "react-router";
import {createPost} from "../../redux/actions/post";
import FileBase from "react-file-base64"

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
      <div className="card mt-5 w-75 offset-md-1">
        <div className="text-center mt-3">Create a post</div>
        <hr />
        <div className="row no-gutters ">
          <div className="col-md-8">
            <form className="md-form">
              <div className="file-field">
                <div className="z-depth-1-half mb-4">
                  {image ? (
                    <img src={image} className="img-fluid virtual" alt="example " />
                  ) : (
                    
                    <img
                      src="https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"
                      className="img-fluid virtual"
                      alt="example placeholder"
                    />
                  )}
                </div>
                <div className="d-flex justify-content-center">
                  <div className="btn btn-mdb-color btn-rounded float-left">
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({base64}) => setFormData({...formData, image : base64})}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-4 ">
            {loading ? (
              "...loading"
            ) : (
              <h5 className="card-title">
                <img
                  src={user.profileImage}
                  alt=""
                  width="25rem"
                  style={{ borderRadius: "50%" }}
                />{" "}
                {user.username}
              </h5>
            )}
            <ul className="list-group list-group-flush">
              <textarea
                className="list-group-item"
                rows="8"
                name="text"
                placeholder="Write a caption"
                onChange={handleChange}
                value={text}
              ></textarea>
              <input
                className="list-group-item "
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
