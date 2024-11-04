import { createSlice } from '@reduxjs/toolkit'
// const initialState = []; if we put here 0 ... we can see in alert at ProductCard.jsx
const initialState = [];

export const MyCartSlice = createSlice({

    name: 'cart',  // this is the name of slice
    initialState, // coming from above .. here we can use var, obj, arrays etc
    reducers: {
                addToCart(state, action) {
                state.push(action.payload)
                // Action's payload carries the data necessary to update the application state
                                        },

                deleteFromCart(state, action) {
                     //state.pop() 
                    //  pop() , just to chk function is working---pop , delete an item of array
                        return state.filter(x => x.id != action.payload.id);
                                        }
    }
})

export const { addToCart, deleteFromCart } = MyCartSlice.actions // these actions are basically functions which we made in above reducers

export default MyCartSlice.reducer;