import React from "react";

export default function CommonButton({
  children,
  variant = "normal",
  className = "",
  ...props
}) {
  const baseStyle =
    "rounded-2xl px-4 py-2 font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-1";

  const variants = {
    normal:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    positive:
      "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    negative:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    gray:
    "bg-gray-300 text-gray-800 hover:bg-gray-400"
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}