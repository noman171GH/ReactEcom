import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MyState from "./context/data/MyState";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/home/Home";

import AllProducts from "./pages/allproducts/AllProducts";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import AddProduct from "./pages/admin/pages/AddProduct";
import UpdateProduct from "./pages/admin/pages/UpdateProduct";

import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import ProductInfo from "./pages/productInfo/ProductInfo";

import NoPage from "./pages/nopage/NoPage";

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allproducts" element={<AllProducts />} />
          {/* <Route path="/order" element={<Order />} /> */}
          {/* Now we will give them protected Route defined very down */}
          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />

          <Route path="/cart" element={<Cart />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRouteForAdmin>
                <Dashboard />
              </ProtectedRouteForAdmin>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/addproduct"
            element={
              <ProtectedRouteForAdmin>
                <AddProduct />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/updateproduct"
            element={
              <ProtectedRouteForAdmin>
                <UpdateProduct />
              </ProtectedRouteForAdmin>
            }
          />
          <Route path="/productinfo/:id" element={<ProductInfo />} />

          <Route path="/*" element={<NoPage />} />
        </Routes>
        <ToastContainer></ToastContainer>
      </Router>
    </MyState>
  );
}

export default App;

//------------------------------------------ Created 2 Protected Routes -------------------------------------

// user

export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    console.log(children);
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

// // admin

const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));
  console.log(admin);
  // see result at very down  ↓ ↓ ↓ ↓ ↓

  if (admin.user.email === "noman171@yahoo.com") {
    return children;
  } else {
    return <Navigate to={"/login"}></Navigate>;
  }
};
// --------------------------------------------------------------------------------------------------------------------

// -----------------console.log(admin) Data ... we have user inadmin and in user we have email;----------------------------

// {user: {…}, providerId: null, _tokenResponse: {…}, operationType: 'signIn'}
// operationType
// :
// "signIn"
// providerId
// :
// null
// user
// :
// apiKey
// :
// "AIzaSyCGDK8BJnOJ68xqO9v-hDYvio8ZYBCDmvY"
// appName
// :
// "[DEFAULT]"
// createdAt
// :
// "1730118321078"
// email
// :
// "noman171@yahoo.com"
// emailVerified
// :
// false
// isAnonymous
// :
// false
// lastLoginAt
// :
// "1730120108907"
// providerData
// :
// [{…}]
// stsTokenManager
// :
// {refreshToken: 'AMf-vBwP8fgrQFxfuj_oaHy4aMYgjO-Pf7oqA3AbjjeF9WxdP2…7NJxlfnWQtjRLM77LHUrRHxwyVgQ8uwTTVcqFAysBS2OfPWrA', accessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImU2YWMzNTcyNzY3ZGUyNj…2L3Gm7C73OCmSguxZHdF6hEEqsqhQM7aZw5Iv1RIEaisE-CTA', expirationTime: 1730123708821}
// uid
// :
// "fl6Vx53YqGbFTlwwuEJPnJ1vqHa2"
// [[Prototype]]
// :
// Object
// _tokenResponse
// :
// {kind: 'identitytoolkit#VerifyPasswordResponse', localId: 'fl6Vx53YqGbFTlwwuEJPnJ1vqHa2', email: 'noman171@yahoo.com', displayName: '', idToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImU2YWMzNTcyNzY3ZGUyNj…2L3Gm7C73OCmSguxZHdF6hEEqsqhQM7aZw5Iv1RIEaisE-CTA', …}
// [[Prototype]]
// :
// Object

// ---------------------------------------------------------------------------------------------------------------------------------------------------------
