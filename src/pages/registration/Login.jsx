import React from "react";

import { Link, useNavigate } from "react-router-dom";

import { useContext, useState } from "react";
import MyContext from "../../context/data/MyContext";
import Loader from "../../componenets/loader/Loader";
import { toast } from "react-toastify";

import { signInWithEmailAndPassword } from "firebase/auth"; //here now we r importing "signInWithEmailAndPassword"
import { auth } from "../../firebase/FirebaseConfig";

function Login() {
  const context = useContext(MyContext);
  const { loading, setLoading } = context;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    setLoading(true);
    if (email === "" || password === "") {
      setLoading(false);
      return toast.error("Both fields are required");

      // I think we should make it false
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);
      toast.success("Login successful", {
        position: "top-center",
        autoClose: 1500,
        // hideProgressBar: true,
        // closeOnClick: true,
        pauseOnHover: false,
        // draggable: true,
        // progress: undefined,
        // theme: "colored",
      });
      localStorage.setItem("user", JSON.stringify(result));
      // The localStorage object allows you to save key/value pairs in the browser. https://www.w3schools.com/jsref/prop_win_localstorage.asp
      // The setItem() method belongs to the Storage Object, which can be either a localStorage object or a sessionStorage object. https://www.w3schools.com/jsref/met_storage_setitem.asp
      // Save Data to Local Storage:--localStorage.setItem(key, value);
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setPassword("");
      setEmail("");
      setLoading(false);
      if (error.code == "auth/invalid-credential") {
        toast.error("Wrong Input");
      }
    }
  };
  return (
    <div className=" flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
        <div className="">
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Login
          </h1>
        </div>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Password"
          />
        </div>
        <div className=" flex justify-center mb-3">
          <button
            onClick={login}
            className=" bg-pink-500 w-full text-black font-bold  px-2 py-2 rounded-lg"
          >
            Login
          </button>
        </div>
        <div>
          <h2 className="text-white">
            Don't have an account{" "}
            <Link className=" text-pink-500 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
