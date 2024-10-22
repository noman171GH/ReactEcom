import React from "react";
import { useState } from "react";
import MyContext from "./MyContext";

function MyState(props) {
  // -------Here we were testing that usestate is functional or not-----------------------------------------------------
  //     const state = {
  //     name: "Shaikh",
  //     class: "B1",
  //   };

  // let nationality = "Cypriot";
  //-----------------------------------------------------------------------------------------------------------------------

  // ----------------  for dark and light theme of WS-------------------------------------------------------------
  const [mode, setMode] = useState("light");
  // bydefault it will be in light mode
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  //--------------------------------------------------------------------------------------------------------------

  return (
    // -------Here we were testing that usestate is functional or not-----------------------------------------------------
    // <>
    //   <MyContext.Provider value={{ state, nationality }}>
    //     {props.children}
    //   </MyContext.Provider>
    // </>
    //-----------------------------------------------------------------------------------------------------------------------

    <>
      <MyContext.Provider value={{ mode, toggleMode }}>
        {props.children}
      </MyContext.Provider>
    </>
  );
}

export default MyState;
