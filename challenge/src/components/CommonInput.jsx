import React from "react";

export default function CommonInput({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        className="border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        {...props}
      />
    </div>
  );
}