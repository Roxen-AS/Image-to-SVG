import React from "react";

export function Card({ children, className }) {
  return (
    <div className={`${className} rounded-lg border border-gray-300 bg-white shadow-lg`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }) {
  return (
    <div className={`${className} p-4`}>
      {children}
    </div>
  );
}
