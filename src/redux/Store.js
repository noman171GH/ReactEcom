import { configureStore } from '@reduxjs/toolkit' ;


import MyCartSlice from "./CartSlice";


export const MyStore = configureStore ({
  reducer: {cart : MyCartSlice},
})