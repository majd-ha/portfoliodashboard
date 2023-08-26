import React from "react";

export default function CustomInput({ name, type, setfield }) {
  return (
    <div className="flex flex-col items-center my-2">
      <label className="my-2 capitalize">{name}</label>
      <input
        className="border indent-2 border-gray-600 outline-none rounded-lg w-[90%] mx-auto"
        type={type}
        onChange={(e) => setfield(e.target.value)}
      />
    </div>
  );
}
