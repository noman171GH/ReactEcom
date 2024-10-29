import React from "react";
import { useState, useEffect } from "react";
import MyContext from "./MyContext";

 import { fireDB }  from "../../firebase/FirebaseConfig";
 import { Timestamp, addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
 import { toast } from 'react-toastify';



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

// -------------------------its about Loader (mouse busy) ----Loading----------------------------------
  const [loading, setLoading] = useState(false);
// ---------------------------------------------------------------------



// ----------------------------Dealing With Product----------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//------- An Object state which we will use to add products ---------------------------
const [products, setProducts] = useState({
  title: null,
  price: null,
  imageUrl: null,
  category: null,
  description: null,
  time: Timestamp.now(),
  date: new Date().toLocaleString(
    "en-US",
    {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }
  )

})
// --------------------------------------------------------------------------------------------------------

// ********************** Add Product **********************
  const addProduct = async () => {
    if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
      return toast.error('Please fill all fields')
    };
    const productRef = collection(fireDB, "products");
    setLoading(true);
    try {
      await addDoc(productRef, products);
      toast.success("Product Added successfully");
      // to show toast and than navigate ...setTimeout
      setTimeout(() => {
        window.location.href = '/dashboard'
                        }, 800);
      getProductData();

      setLoading(false);
    } catch (error) {
      console.log(error);
      alert (error);
      setLoading(false);
    }
    //setProducts("");
  }
// ********************** End of ---Add Product **********************



// ************************** get product********************************

const [product, setProduct] = useState([]); // using a state to get product data

const getProductData = async () => {
  setLoading(true)
  try {

    // here we are writing query where we are teling that from FB bring tblProducts order by time 
    const q = query(
      collection(fireDB, "products"),
      orderBy("time")
    );

    // You can listen to a document with the onSnapshot() method.
    // An initial call using the callback you provide creates a document snapshot
    // immediately with the current contents of the single document.
    // Then, each time the contents change, another call updates the document snapshot.
    // so its all about "real time updated data".


    const data = onSnapshot(q, (QuerySnapshot) => {
      let productArray = [];
      QuerySnapshot.forEach((doc) => {
        productArray.push({ ...doc.data(), id: doc.id }); // What is ...doc ? = spread Operator https://www.w3schools.com/howto/howto_js_spread_operator.asp
      });                                                  // we are saving Data and id in our array "productsArray"
      setProduct(productArray)                           // then assigning "productArray" to our state "Product"
      setLoading(false);
    });
    return () => data;     /// we are returning data got by snapshot
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}

useEffect(() => {        // putting it in useEffect so we can fetch data automatically. its [] , so it will run once atlaest.
  getProductData();
}, []);

// ************************** End of -----get product********************************

// ----------------------------End of ---Dealing With Product----------------------------------------------------

  return (
    // -------Here we were testing that usestate is functional or not-----------------------------------------------------
    // <>
    //   <MyContext.Provider value={{ state, nationality }}>
    //     {props.children}
    //   </MyContext.Provider>
    // </>
    //-----------------------------------------------------------------------------------------------------------------------



    // passing States to other places where we need it
    <>
      <MyContext.Provider value={{ mode, toggleMode , loading, setLoading, products, setProducts,addProduct,product }}>
        {props.children}
      </MyContext.Provider>
    </>
  );
}

export default MyState;
