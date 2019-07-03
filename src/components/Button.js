import React from "react";

function Button({ type, onClick, className }) {
  return (
    <button className={className} type={type} onClick={onClick}>
      Clear All
    </button>
  );
}

export default Button;
