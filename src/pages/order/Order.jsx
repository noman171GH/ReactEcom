import React, { useContext } from "react";
import MyContext from "../../context/data/MyContext";
import Layout from "../../componenets/layout/Layout";
import Loader from "../../componenets/loader/Loader";

function Order() {
  const userid = JSON.parse(localStorage.getItem("user")).user.uid;
  // alert(userid);
  const context = useContext(MyContext);
  const { mode, loading, order } = context;
  return (
    <Layout>
      {loading && <Loader />}
      {order.length > 0 ? (
        <>
          <div className=" h-full pt-10">
            {/* for  learnin filter https://www.w3schools.com/jsref/jsref_filter.asp and for mapping https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_map */}

            {order
              .filter((obj) => obj.userid == userid)
              .map((order) => {
                // order.cartItems.map()
                return (
                  <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    {order.cartItems.map((item) => {
                      return (
                        <div className="rounded-lg md:w-2/3">
                          <div
                            className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                            style={{
                              backgroundColor: mode === "dark" ? "#282c34" : "",
                              color: mode === "dark" ? "white" : "",
                            }}
                          >
                            <img
                              src={item.imageUrl}
                              alt="product-image"
                              className="w-full rounded-lg sm:w-40"
                            />
                            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                              <div className="mt-5 sm:mt-0">
                                <h2
                                  className="text-lg font-bold text-gray-900"
                                  style={{
                                    color: mode === "dark" ? "white" : "",
                                  }}
                                >
                                  {item.title}
                                </h2>
                                <p
                                  className="mt-1 text-xs text-gray-700"
                                  style={{
                                    color: mode === "dark" ? "white" : "",
                                  }}
                                >
                                  {item.description}
                                </p>
                                <p
                                  className="mt-1 text-xs text-gray-700"
                                  style={{
                                    color: mode === "dark" ? "white" : "",
                                  }}
                                >
                                  € {item.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <h2 className=" text-center tex-2xl text-white">Not Order</h2>
      )}
    </Layout>
  );
}

export default Order;
