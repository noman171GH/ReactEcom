import React from "react";
import { useState, useEffect } from "react";
import MyContext from "./MyContext";

import { fireDB } from "../../firebase/FirebaseConfig";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

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
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });
  // --------------------------------------------------------------------------------------------------------

  // ********************** Add Product **********************
  const addProduct = async () => {
    if (
      products.title == null ||
      products.price == null ||
      products.imageUrl == null ||
      products.category == null ||
      products.description == null
    ) {
      return toast.error("Please fill all fields");
    }
    const productRef = collection(fireDB, "products");
    setLoading(true);
    try {
      await addDoc(productRef, products);
      toast.success("Product Added successfully");
      // to show toast and than navigate ...setTimeout
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
      getProductData();

      setLoading(false);
    } catch (error) {
      console.log(error);
      //alert (error);
      setLoading(false);
    }
    //setProducts("");
  };
  // ********************** End of ---Add Product **********************

  // ************************** get product********************************

  const [product, setProduct] = useState([]); // using a state to get product data

  const getProductData = async () => {
    setLoading(true);
    try {
      // here we are writing query where we are teling that from FB bring tblProducts order by time
      const q = query(collection(fireDB, "products"), orderBy("time"));

      // You can listen to a document with the onSnapshot() method.
      // An initial call using the callback you provide creates a document snapshot
      // immediately with the current contents of the single document.
      // Then, each time the contents change, another call updates the document snapshot.
      // so its all about "real time updated data".

      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id }); // What is ...doc ? = spread Operator https://www.w3schools.com/howto/howto_js_spread_operator.asp
        }); // we are saving Data and id in our array "productsArray"
        setProduct(productArray); // then assigning "productArray" to our state "Product"
        setLoading(false);
      });
      return () => data; /// we are returning data got by snapshot
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // putting it in useEffect so we can fetch data automatically. its [] , so it will run once atlaest.
    getProductData();
    getOrderData();
  }, []);

  // ************************** End of -----get product********************************

  // ------------------------------Update Product-----------------------------------------------

  // to get id of change
  const edithandle = (item) => {
    setProducts(item);
  };
  //------------------------------

  const updateProduct = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product Updated successfully");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  //setDoc is used to create or update a document in a collection. If a document with the specified ID already exists,
  //setDoc will overwrite its existing data with the new data specified in the method call. If the document doesn't exist,
  //setDoc will create a new document with the specified ID and the specified data.

  // Add Data Using setDoc() With Custom-ID
  //*************************************** */

  //   1.  getFirestore() → Firestore database where we want to add data as a document.
  //   2.  doc() → Where we want to add collection name and database references as well as our custom document ID.
  //   3.  setDoc() → Where we actually pass our data along with the collection name and db references.

  // **********************delete product********************************
  const deleteProduct = async (items) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "products", items.id));
      toast.success("Product Deleted successfully");
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  //------------------------------------------------------------------------

  // ----------------------------End of  Product----------------------------------------------------

  // ****************************************Order********************************************************

  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      setOrder(ordersArray);
      console.log(ordersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // *****************************************************************************************************

  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "users"));
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false);
      });
      setUser(usersArray);
      console.log(usersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderData();
    getUserData();
  }, []);

  // **************for filtera at Home Page*********************

  const [searchkey, setSearchkey] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  // *******************************************************

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
      <MyContext.Provider
        value={{
          mode,
          toggleMode,
          loading,
          setLoading,
          products,
          setProducts,
          addProduct,
          product,
          updateProduct,
          edithandle,
          deleteProduct,
          order,
          user,
          searchkey,
          setSearchkey,
          filterType,
          setFilterType,
          filterPrice,
          setFilterPrice,
        }}
      >
        {props.children}
      </MyContext.Provider>
    </>
  );
}

export default MyState;
