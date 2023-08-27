import React from "react";
import "./my-loader.scss";
const MyLoader: React.FC = () => {
  return (
    <div className="my-loader">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default MyLoader;
