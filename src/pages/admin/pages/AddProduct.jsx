import React, { useContext } from "react";
import MyContext from "../../../context/data/MyContext";

function AddProduct() {

  const context = useContext(MyContext);
  const {products,setProducts,addProduct} = context;


  return (
    <div>
      <div className=" flex justify-center items-center h-screen">
        <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
          <div className="">
            <h1 className="text-center text-white text-xl mb-4 font-bold">
              Add Product 
            </h1>
            <br /> <h2 className="text-center text-white text-xl mb-4 font-italic">Committed Sin as opened with refresh without Navigate</h2>
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => setProducts({ ...products, title: e.target.value })}
              name="title"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product title"
            />
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => setProducts({ ...products, price: e.target.value })}
              name="price"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product price"
            />
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
              name="imageurl"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product imageUrl"
            />
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => setProducts({ ...products, category: e.target.value })}
              name="category"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product category"
            />
          </div>
          <div>
            <textarea
              cols="30"
              rows="10"
              name="title"
              onChange={(e) => setProducts({ ...products, description: e.target.value })}
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product Desc"
            ></textarea>
          </div>
          <div className=" flex justify-center mb-3">
            <button onClick={ addProduct } className=" bg-pink-500 w-full text-black font-bold  px-2 py-2 rounded-lg">
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
