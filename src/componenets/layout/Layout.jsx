import React from "react";
import TopNavbar from "../navbar/TopNavbar";
import Footer from "../footer/Footer";

 function Layout({ children }) {

  return (
    <div>
      <TopNavbar />
      <div className="content">{children}</div>
      <Footer /> 
      Layout
    </div>
  );
}

export default Layout;
