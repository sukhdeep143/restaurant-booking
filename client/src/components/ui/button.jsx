import React from "react";

export const Button = ({ children, onClick, variant = "default", className = "" }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded ${variant === "link" ? "underline text-blue-600" : "bg-blue-600 text-white"} ${className}`}
  >
    {children}
  </button>
);