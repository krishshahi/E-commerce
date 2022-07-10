import {configureStore} from "@reduxjs/toolkit";
import searchReducer from "./reducers/search-reducer";
import cartReducer from "./reducers/cart-reducer";

// action ====> Reducer ====> store 
export const store = configureStore({
    reducer: {
        search: searchReducer,
        cart: cartReducer
    }
})
export const RootState = store.getState;
export const AppDispatch = store.dispatch;