
import React from "react";

export const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg bg-white shadow-sm ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);