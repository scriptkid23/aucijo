import React from "react";

export default function LoadingComponent({ isLoading, title, backdrop }) {
  return (
    isLoading && <div className={`loading-component ${backdrop && "modal-backdrop"}`}>
      <div class="loader">
        <div class="dot dot1"></div>
        <div class="dot dot2"></div>
        <div class="dot dot3"></div>
        <div class="dot dot4"></div>
        <div class="dot dot5"></div>
      </div>
      <p className="m-3">{title}</p>
    </div>
  );
}
