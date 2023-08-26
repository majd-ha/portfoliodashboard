import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ModifyProject() {
  const [link, setlink] = useState("");
  const [description, setdescription] = useState("");
  const [dev, setdev] = useState(false);
  const { id } = useParams();
  const [name, setname] = useState("");
  const handlesubmit = async () => {
    const res = await fetch(`http://127.0.0.1:3001/modify/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name, link, dev, description }),
    });
    const data = await res.json();
    if (res.ok) {
      console.log(data);
    }
  };
  useEffect(() => {
    const getone = async () => {
      const res = await fetch(`http://127.0.0.1:3001/getone/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();

      setname(data.oneproject.name);
      setlink(data.oneproject.link);
      setdescription(data.oneproject.description);
      setdev(data.oneproject.dev);
    };
    getone();
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 w-[50%] mx-auto">
      <div className="input ">
        <label>project name</label>
        <input
          className="inputfield"
          type="text"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
      </div>

      {/*  */}
      <div className="input">
        <label>project description</label>
        <input
          className="inputfield"
          type="text"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
      </div>
      {/*  */}
      <div className="input">
        <label>project link</label>
        <input
          className="inputfield"
          type="text"
          value={link}
          onChange={(e) => setlink(e.target.value)}
        />
      </div>
      {/*  */}
      <div className="flex gap-5">
        <label>under dev</label>
        <input
          className="border border-gray-700   "
          type="checkbox"
          checked={dev}
          onChange={(e) => setdev(e.target.checked)}
        />
      </div>
      <button
        className="py-2 px-3 bg-green-700 text-white rounded-lg "
        onClick={handlesubmit}
      >
        submit
      </button>
    </div>
  );
}
