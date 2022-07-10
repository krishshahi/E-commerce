import { createSlice } from "@reduxjs/toolkit";

export const SearchSlice = createSlice({
    name: "search",
    initialState: {
        keyword: ''
    },
    reducers: {
        setKeyword: (state, action) => {
            state.keyword = action.payload.keyword
        }
    }
});

export const {setKeyword} = SearchSlice.actions;
export default SearchSlice.reducer;