import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="h-[70px] p-4 flex items-center border border-transparent border-b-green-600 justify-end">
      <Link
        to={"addproject"}
        className="my-3 p-3 bg-green-500 text-white rounded-lg"
      >
        add project
      </Link>
    </nav>
  );
}
