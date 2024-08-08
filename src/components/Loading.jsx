import React from "react";
import loading from "../assets/loading.gif";

const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <img src={loading} alt="Loading..." />
    </div>
  );
};

export default Loading;
