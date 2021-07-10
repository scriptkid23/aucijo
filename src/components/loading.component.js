import React from "react";

export default function LoadingComponent({ isLoading, title, backdrop }) {
  return (
    isLoading && <div className={`loading-component ${backdrop && "modal-backdrop"}`}>
      <div className="loader">
        <div className="dot dot1"></div>
        <div className="dot dot2"></div>
        <div className="dot dot3"></div>
        <div className="dot dot4"></div>
        <div className="dot dot5"></div>
      </div>
      <p className="m-3">{title}</p>
    </div>
  );
}
