import React from "react";
import { Link } from "react-router-dom";

export default function Card({ el, setChanged }) {
  const base = "https://backenddashboard.onrender.com";
  const removeProject = async () => {
    const res = await fetch(`${base}/delete/${el._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.ok) {
      console.log("deleted successfully");
      setChanged(true);
    }
  };

  return (
    <div className="my-5">
      <div className="grid grid-cols-2 rounded-xl w-[50%] grid-rows-5 items-center mx-auto border border-gray-700">
        <div className=" p-4 col-span-1 row-span-5 grid grid-cols-1 grid-rows-5">
          <h1 className="text-center text-2xl capitalize font-mono row-span-1">
            {el.name}
          </h1>
          <p className="italic text-xs text-gray-700 break-words row-span-1">
            {el.description.slice(0, 70)}
            {"...."}
          </p>
          <p className="text-gray-600 cursor-pointer row-span-1">
            {" "}
            <a href={el.link}></a> {el.link}
          </p>
          <p
            className={`${
              el.dev ? "text-red-900" : "text-green-900"
            } row-span-1 font-bold`}
          >
            {el.dev ? "under development" : "production version"}
          </p>
          <div className="flex justify-around items-center mt-4 row-span-1">
            <Link
              to={`modify/${el._id}`}
              className="bg-orange-600 text-white px-4 py-2 rounded-xl"
            >
              modify
            </Link>
            <button
              onClick={removeProject}
              className="bg-red-600 text-white px-4 py-2 rounded-xl"
            >
              remove
            </button>
          </div>
        </div>
        <div className=" col-span-1 row-span-5">
          <img
            src={`${base}/images/${el.img}`}
            alt="f"
            className="object-contain w-[90%] row-span-5"
          />
        </div>
      </div>
    </div>
  );
}
