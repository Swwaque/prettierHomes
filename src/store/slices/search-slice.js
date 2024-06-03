import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    searchParams: null,
    displayMode: "card",
}

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchParams: (state, action) => {
            state.searchParams = action.payload;
        },
        resetSearchParams: (state) => {
            state.searchParams = initialState.searchParams;
        },
        setDisplayMode: (state, action) => {
            state.displayMode = action.payload;
        },
    }
})

export const { setSearchParams, resetSearchParams, setDisplayMode } = searchSlice.actions;
export default searchSlice.reducer;