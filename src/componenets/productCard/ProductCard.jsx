import React, { useContext, useEffect } from "react";
import MyContext from "../../context/data/MyContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/CartSlice";

import { toast } from "react-toastify";

function ProductCard() {
  const context = useContext(MyContext);
  const { mode, product, searchkey, filterType, filterPrice } = context; // destructuring "context".
  //   to check dark/Light
  const Pro = [];
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  // alert(cartItems);
  console.log(cartItems);

  // add to cart

  // using here "Pro" whixh is an Array to recieve argument from Add to Cart button.
  const addCart = (Pro) => {
    dispatch(addToCart(Pro));
    toast.success("add to cart");
  };

  // --------To handle total Cart Item----------------------------------------------------------------------

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems)); // To prevent the quantity of added items in cart coz of f5.. cart show 0 after refresh so....
  }, [cartItems]);
  // https://www.w3schools.com/jsref/met_storage_setitem.asp
  // Syntax ---- localStorage.setItem(keyname, value)

  // ------------------------------------------------------------------------------------------------------

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        <div class="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1
            class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Our Latest Collection
          </h1>
          <div class="h-1 w-20 bg-pink-600 rounded"></div>
        </div>

        <div className="flex flex-wrap -m-4">
          {/* // getting "product" and using map to show  */}
          {product
            .filter((obj) => obj.title.toLowerCase().includes(searchkey))
            .filter((obj) => obj.category.toLowerCase().includes(filterType))
            .filter((obj) => obj.price.includes(filterPrice)) // https://www.w3schools.com/jsref/jsref_includes_array.asp
            .map((item, index) => {
              const { title, price, description, imageUrl, id } = item; // destructuring item ...
              return (
                <div className="p-4 md:w-1/4  drop-shadow-lg " key={index}>
                  <div
                    className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                    style={{
                      backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    <div
                      onClick={() =>
                        (window.location.href = `/productinfo/${id}`)
                      }
                      className="flex justify-center cursor-pointer"
                    >
                      <img
                        className=" rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out"
                        src={imageUrl}
                        alt="blog"
                      />
                    </div>
                    <div className="p-5 border-t-2">
                      <h2
                        className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        E-Cyprus
                      </h2>
                      <h1
                        className="title-font text-lg font-medium text-gray-900 mb-3"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {title}
                      </h1>
                      <p className="leading-relaxed mb-3">{description}</p>
                      <p
                        className="leading-relaxed mb-3"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        € {price}
                      </p>
                      <div className=" flex justify-center">
                        <button
                          onClick={() => addCart(item)}
                          type="button"
                          className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full  py-2"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default ProductCard;

// https://www.youtube.com/watch?v=ubOSF_xdB3g How to make cards.... tutorial. https://www.youtube.com/watch?v=833YXAXXdds for Tailwind CSS
