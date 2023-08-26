import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ isAuth, setIsAuth }) {
  const base = "https://backenddashboard.onrender.com";
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLog = async () => {
    if (!Email || !password) {
      setMsg("all fields must be filled");
    } else {
      const res = await fetch(`${base}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: Email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          localStorage.removeItem("token");
        }, 3600000);
        setIsAuth(true);
        navigate("/homepage");
      } else {
        setIsAuth(false);
        throw new Error("not a USER");
      }
    }
  };
  useEffect(() => {
    if (isAuth) {
      navigate("/homepage");
    }
  }, []);
  return (
    <div>
      <div className="w-[40%] max-sm:w-[100%] p-3 rounded-lg shadow-xl mx-auto my-5 ">
        <div className="flex flex-col items-center my-2">
          <label className="my-2">E-mail</label>
          <input
            className="border indent-2 border-gray-600 outline-none rounded-lg w-[90%] mx-auto"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center mb-2">
          <label className="my-2">password</label>
          <input
            className="border indent-2 border-gray-600 outline-none rounded-lg w-[90%] mx-auto"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="block w-[20%] mx-auto my-3 p-3 bg-green-500 text-white rounded-lg"
          onClick={handleLog}
        >
          Log in
        </button>
      </div>
    </div>
  );
}
