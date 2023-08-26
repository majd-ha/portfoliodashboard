import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
export default function AddProject() {
  const inputref = useRef();
  const [name, setname] = useState("");
  const [link, setlink] = useState("");
  const [description, setdescription] = useState("");
  const [dev, setdev] = useState(false);
  const [img, setimg] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("link", link);
    formdata.append("imgfile", img);
    formdata.append("dev", dev);
    formdata.append("description", description);
    console.log(formdata.values());
    const res = await axios.post("http://127.0.0.1:3001/addproject", formdata, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if ("err" in res.data) {
      throw new Error(res.data.err);
    } else {
      navigate("/homepage");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="w-[40%] max-sm:w-[100%] p-3 rounded-lg shadow-xl mx-auto my-5 ">
          <CustomInput name={"name"} type={"text"} setfield={setname} />
          <CustomInput
            name={"description"}
            type={"text"}
            setfield={setdescription}
          />
          <CustomInput name={"project link"} type={"text"} setfield={setlink} />
          <div className="flex flex-col items-center my-2">
            <label className="my-2 capitalize">under dev</label>
            <input
              className="border indent-2 border-gray-600 outline-none rounded-lg w-[90%] mx-auto"
              type={"checkbox"}
              onChange={(e) => setdev(e.target.checked)}
            />
          </div>
          <div
            className="flex flex-col items-center my-2"
            onClick={() => inputref.current.click()}
          >
            <div className="my-2 capitalize text-center  cursor-pointer">
              {" "}
              {img ? (
                <img
                  src={URL.createObjectURL(img)}
                  alt="f"
                  className="object-cover"
                />
              ) : (
                "add image"
              )}{" "}
            </div>
            <input
              ref={inputref}
              className="hidden"
              type={"file"}
              onChange={(e) => setimg(e.target.files[0])}
            />
          </div>

          <button className="block w-[20%] mx-auto my-3 p-3 bg-green-500 text-white rounded-lg capitalize">
            add
          </button>
        </div>
      </form>
    </div>
  );
}
