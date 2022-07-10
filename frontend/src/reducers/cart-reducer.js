import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
    name: "cart",
    initialState: {
       counter: 0
    },
    reducers: {
        setCartCounter: (state) => {
            let cart_items = JSON.parse(localStorage.getItem('stack_7_cart')) ?? [];
            let total = 0;
            cart_items.map((o) => {
                total += Number(o.qty)
            })
            state.counter = total;
        }
    }
});

export const {setCartCounter} = CartSlice.actions;
export default CartSlice.reducer;