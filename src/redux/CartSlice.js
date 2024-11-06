import { createSlice } from '@reduxjs/toolkit'
// const initialState = []; if we put here 0 ... we can see in alert at ProductCard.jsx

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

// The nullish coalescing (??) operator is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined,
//  and otherwise returns its left-hand side operand. for more https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing


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




// *******************************TO UNDERSTAND BETTER************************************
// const foo = 'nomi' ?? 'noman';
// console.log(foo);
// // Expected output: "nomi"

// const baz = 'default string' ?? 42;
// console.log(baz);
// // Expected output: 0
// ----------------------------------------------------------------------------------------------