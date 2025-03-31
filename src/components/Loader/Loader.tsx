//React
import React from "react";

const Loader = () => {
  return <div className="d-flex w-100 h-100 align-items-center justify-content-center position-absolute">
    <div
      className="spinner-border"
      role="status"
    >
    </div>
  </div>
};

export default Loader;