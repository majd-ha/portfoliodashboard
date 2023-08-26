import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import NavBar from "../components/NavBar";

export default function HomePage() {
  const [projects, setProjects] = useState([]);
  const [changed, setChanged] = useState(false);
  useEffect(() => {
    const getall = async () => {
      const res = await fetch("http://127.0.0.1:3001/");
      const data = await res.json();
      setProjects(data.projects);
    };
    getall();
  }, [changed]);
  return (
    <div>
      <NavBar />
      <div>
        <p className="text-center capitalize text-2xl">all projects </p>
        <div>
          {projects?.map((el) => {
            return <Card el={el} key={el._id} setChanged={setChanged} />;
          })}
        </div>
      </div>
    </div>
  );
}
