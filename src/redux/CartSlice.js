import { createSlice } from '@reduxjs/toolkit'
const initialState = [];

export const MyCartSlice = createSlice({

    name: 'cart',
    initialState,
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

export const { addToCart, deleteFromCart } = MyCartSlice.actions

export default MyCartSlice.reducer;