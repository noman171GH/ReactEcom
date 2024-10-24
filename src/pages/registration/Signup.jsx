import { Link } from "react-router-dom";
import { useContext, useState } from 'react';
import MyContext from "../../context/data/MyContext";
// import Loader from "./componenets/loader/Loader.jsx";
import { toast } from 'react-toastify';

function Signup() {
// ------- 3 use States for three fields ---------------
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
// -----------------------------------------------------------------------

// WE will use "Loading" here so import context from React and MyContext too
const context = useContext(MyContext);
const { loading, setLoading } = context;
// -------------------------------------------------------------

// ----------------------------- now we will make Signup Function----------------------------------------------------

const Signup = () => {
  
 console.log (name,email, password) 

// const signup = async () => {
//   setLoading(true)
//   if (name === "" || email === "" || password === "") {
//       return toast.error("All fields are required")
//   }

//   try {
//       const users = await createUserWithEmailAndPassword(auth, email, password);

//       // console.log(users)

//       const user = {
//           name: name,
//           uid: users.user.uid,
//           email: users.user.email,
//           time : Timestamp.now()
//       }
//       const userRef = collection(fireDB, "users")
//       await addDoc(userRef, user);
//       toast.success("Signup Succesfully")
//       setName("");
//       setEmail("");
//       setPassword("");
//       setLoading(false)
      
//   } catch (error) {
//       console.log(error)
//       setLoading(false)
//   }
 }
// -------------------End of Signup Function-------------------------------------------------------------------
  return (
    <div className=" flex justify-center items-center h-screen">
      <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
        <div className="">
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Signup
          </h1>
        </div>
        <div>
                    <input type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name='name'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Name'
                    />
                </div>
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Password"
          />
        </div>
        <div className=" flex justify-center mb-3">
          <button onClick={Signup} className=" bg-pink-500 w-full text-white font-bold  px-2 py-2 rounded-lg">
            Signup
          </button>
        </div>
        <div>
          <h2 className="text-white">
            Have an account{" "}
            <Link className=" text-pink-500 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Signup;
