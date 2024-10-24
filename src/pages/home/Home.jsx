import React from "react";
import { useState } from "react";
import Layout from "../../componenets/layout/Layout";
import MyContext from "../../context/data/MyContext";
import { HeroSection } from "../../componenets/heroSection/HeroSection";
import Filter from "../../componenets/filter/Filter";
import ProductCard from "../../componenets/productCard/ProductCard";
import Track from "../../componenets/track/Track";
import Testimonial from "../../componenets/testimonial/Testimonial";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../../redux/CartSlice';

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

  const dispatch = useDispatch();
  const cartItem = useSelector((state)=> state.cart)

  console.log(cartItem);

  const addCart = () => {
    dispatch(addToCart("shirt"));
  }

  const deleteCart = () => {
    dispatch(deleteFromCart("shirt"));
  }

  return (
    <Layout>
        <div className="flex gap-5 justify-center">
          <button className=' bg-gray-300 p-5' onClick={()=> addCart()}>add</button>
          <button className=' bg-gray-300 p-5' onClick={()=> deleteCart()}>del</button>
      </div>
      <HeroSection></HeroSection>
      <Filter />
      <ProductCard />
      <Track></Track>
      <Testimonial></Testimonial>

      {/* <h1>Home</h1> */}
    </Layout>
  );
}

export default Home;
