import React from "react";
import { useState } from "react";
import Layout from "../../componenets/layout/Layout";
// import MyContext from "../../context/data/MyContext";
import { HeroSection } from "../../componenets/heroSection/HeroSection";
import Filter from "../../componenets/filter/Filter";
import ProductCard from "../../componenets/productCard/ProductCard";

function Home() {
  //const context = useContext(MyContext);

  // --------------To chk if useState working --------------------------------
  // console.log(context);
  // in console we got this .......
  // {state: {…}, nationality: 'Cypriot'}
  // nationality :   "Cypriot"
  // state :  {name: 'Shaikh', class: 'B1'}
  // [[Prototype]] :   Object
  //-------------------------------------------------------------------------

  // ------------------Destructuring the Object-----------------------------------
  // for more info : https://www.w3schools.com/react/react_es6_destructuring.asp
  // let info = context;
  // console.log(info.nationality); // Cypriot
  // console.log(info.state.name); // Shaikh
  //---------------------------------------------------------------------------------

  //return <Layout>{info.state.name}</Layout>;

  return (
    <Layout>
      <HeroSection></HeroSection>
      <Filter />
      <ProductCard />

      {/* <h1>Home</h1> */}
    </Layout>
  );
}

export default Home;
