import React from "react";

export function Button({ onClick, className, children, disabled }) {
  return (
    <button
      onClick={onClick}
      className={`${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
