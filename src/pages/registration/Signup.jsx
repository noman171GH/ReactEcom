import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import MyContext from "../../context/data/MyContext";
import Loader from "../../componenets/loader/Loader";
import { toast } from "react-toastify";

// Firebase related Imports-------------------------------------------
import { createUserWithEmailAndPassword } from "firebase/auth"; // importing  createUserWithEmailAndPassword
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { SiThenorthface } from "react-icons/si";
// ----------------------------------------------------------------------

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

  // const Signup = () => {
  //   // console.log(name, email, password);
  // }

  const Signup = async () => {
    setLoading(true);
    if (name === "" || email === "" || password === "") {
      setLoading(false); // I think we should make it false
      return toast.error("All fields are required");
    }

    // async so function wil run in Sequeance and as using async so we will use try catch

    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);

      // it will create a Tab under Authentication with Sign-in method ! Templates !Usage ! Settings ! Extensions
      // createUserWithEmailAndPassword(auth, email, password) ---- is Firebase Function , use to create user---- formore https://firebase.google.com/docs/auth/web/password-auth
      // console.log(users);
      // to see console result scroll very down

      const user = {
        // ----- uid and time is coming from FB----
        uid: users.user.uid,
        time: Timestamp.now(),
        // ---------------------------------------
        name: name,
        email: users.user.email,
      };

      // What is a Firestore collection?Firebase's Firestore service is a no-SQL database that stores all of its data in the form of collections instead of tables.

      const userRef = collection(fireDB, "users");
      //  telling that DB is "fireDb" and Table is "users".
      await addDoc(userRef, user); // with two perams ... one DB ref and second data.
      // --------------if we comment.... (await addDoc(userRef, user);) it . Data will be in Firebase "Authentication " but not in Database
      toast.success("Signup Succesfully");
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
    } catch (error) {
      console.log(error);

      if (error.code == "auth/email-already-in-use") {
        toast.error("In use");
      }
      setLoading(false);
    }
  };
  // -------------------End of Signup Function-------------------------------------------------------------------
  return (
    <div className=" flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
        <div className="">
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Signup
          </h1>
        </div>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Name"
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
          <button
            onClick={Signup}
            className=" bg-pink-500 w-full text-white font-bold  px-2 py-2 rounded-lg"
          >
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

// -----------------------console.Log Result-----------------------------------------------------------------------------------------------------------------------------------

// _UserCredentialImpl {user: _UserImpl, providerId: null, _tokenResponse: {…}, operationType: 'signIn'}
// operationType
// :
// "signIn"
// providerId
// :
// null
// user
// :
// _UserImpl
// accessToken
// :
// "eyJhbGciOiJSUzI1NiIsImtpZCI6ImU2YWMzNTcyNzY3ZGUyNjE0ZmM1MTA4NjMzMDg3YTQ5MjMzMDNkM2IiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVhY3RlY29tLWY4NzQxIiwiYXVkIjoicmVhY3RlY29tLWY4NzQxIiwiYXV0aF90aW1lIjoxNzMwMTExMTI5LCJ1c2VyX2lkIjoiMjNNeklIYTV0c1ZJRnRYNlpOc3VMSmV3SkFsMiIsInN1YiI6IjIzTXpJSGE1dHNWSUZ0WDZaTnN1TEpld0pBbDIiLCJpYXQiOjE3MzAxMTExMjksImV4cCI6MTczMDExNDcyOSwiZW1haWwiOiJqYW1pQHRlc3QuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImphbWlAdGVzdC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.a2VVge-41VGj99W5ojcrrNInekBS4kuCFD8L0XJABYrmOSS2szPzrg3e-k8zjNhxZrAIt3v2a3FNmZWy2dqAUPjz5NgfcHX6GAZtXydK0VCwrfIDqdYRiMQb-W6U1qKhP74bpuvaObZ3mNilPLr8c2n06VEzBVuZAS7NW3G9L5lMl9-Ak-SohMPQKLEIta3vHUTG6kDO-XbPMiWGjuNBfRgrCfRpE6LJZA4wqZDPPUERqxQiq5WALLBF5T6-cThE3T5wzXzmFRVyBgVn06LWnu46ZKnXI-vGTXFVhMSOEJPmTrv0AbFE3e-B14_bZ42k3nH_5S66YXnpfkGvho1THg"
// auth
// :
// AuthImpl {app: FirebaseAppImpl, heartbeatServiceProvider: Provider, appCheckServiceProvider: Provider, config: {…}, currentUser: _UserImpl, …}
// displayName
// :
// null
// email
// :
// "jami@test.com"
// emailVerified
// :
// false
// isAnonymous
// :
// false
// metadata
// :
// UserMetadata {createdAt: '1730111128964', lastLoginAt: '1730111128964', lastSignInTime: 'Mon, 28 Oct 2024 10:25:28 GMT', creationTime: 'Mon, 28 Oct 2024 10:25:28 GMT'}
// phoneNumber
// :
// null
// photoURL
// :
// null
// proactiveRefresh
// :
// ProactiveRefresh {user: _UserImpl, isRunning: true, timerId: 61, errorBackoff: 30000}
// providerData
// :
// [{…}]
// providerId
// :
// "firebase"
// reloadListener
// :
// null
// reloadUserInfo
// :
// {localId: '23MzIHa5tsVIFtX6ZNsuLJewJAl2', email: 'jami@test.com', passwordHash: 'UkVEQUNURUQ=', emailVerified: false, passwordUpdatedAt: 1730111128964, …}
// stsTokenManager
// :
// _StsTokenManager {refreshToken: 'AMf-vBzMAz9Q8OTkvCgN-bJDn0cClY90PP1djHq2n8Y0MK9dUM…048LrbUiB7AGUV6jq4_Llgb_aElxXmA9HZy6JBUJwGJYMsb6Q', accessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImU2YWMzNTcyNzY3ZGUyNj…MSOEJPmTrv0AbFE3e-B14_bZ42k3nH_5S66YXnpfkGvho1THg', expirationTime: 1730114729322}
// tenantId
// :
// null
// uid
// :
// "23MzIHa5tsVIFtX6ZNsuLJewJAl2"
// refreshToken
// :
// (...)
// [[Prototype]]
// :
// Object
// _tokenResponse
// :
// {kind: 'identitytoolkit#SignupNewUserResponse', idToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImU2YWMzNTcyNzY3ZGUyNj…MSOEJPmTrv0AbFE3e-B14_bZ42k3nH_5S66YXnpfkGvho1THg', email: 'jami@test.com', refreshToken: 'AMf-vBzMAz9Q8OTkvCgN-bJDn0cClY90PP1djHq2n8Y0MK9dUM…048LrbUiB7AGUV6jq4_Llgb_aElxXmA9HZy6JBUJwGJYMsb6Q', expiresIn: '3600', …}
// [[Prototype]]
// :
// Object
