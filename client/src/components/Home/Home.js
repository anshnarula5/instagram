import React from "react";
import { useSelector } from "react-redux";
import Posts from "./Posts";
import Right from "./Right";

const Home = () => {
  return (
    <>
      <div className="w-75 offset-md-1">
        <div className="row">
          <div className="col-md-8 mt-4 ">
            <Posts />
          </div>
          <div className="col-md-4 mt-4 " style = {{zIndex : "0"}}>
            <div className="sticky-top" style={{ top: "2rem" }}>
              <Right />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
