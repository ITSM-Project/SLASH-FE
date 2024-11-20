import React from "react";
import "../../styles/Loading.css";

const Loading = ({ text = "로딩중..." }) => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">{text}</p>
    </div>
  );
};

export default Loading;
