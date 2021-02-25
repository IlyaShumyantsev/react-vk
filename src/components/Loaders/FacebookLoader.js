import React from "react";
import "./FacebookLoader.css";

const FacebookLoader = () => {
  return (
    <div className="row mt-3 justify-content-center ">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default FacebookLoader;
