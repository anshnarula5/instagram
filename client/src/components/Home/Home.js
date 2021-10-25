import React from "react";
import Posts from "./Posts";

const Home = () => {
  return (
    <>
      <div className="w-75 offset-md-1">
        <div className="row">
          <div className="col-md-8 mt-4 ">
            <Posts />
          </div>
          <div className="col-md-4 mt-4 ">right</div>
        </div>
      </div>
    </>
  );
};

export default Home;
