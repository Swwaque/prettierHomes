import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    favorites: [],
    modal: false,
}

export const favSlice = createSlice({
    name: "fav",
    initialState,
    reducers: {
        fetchFavs: (state, action) => {
            state.favorites = action.payload;
        },
        toggleFav: (state, action) => {
            const index = state.favorites.indexOf(action.payload);
            if (index !== -1) {
                state.favorites.splice(index, 1);
            } else {
                state.favorites.push(action.payload);
            }
        },
        resetFavs: (state) => {
            state.favorites = [];
        },
        showModal: (state) => {
            state.modal = true;
        },
        hideModal: (state) => {
            state.modal = false;
        }
    }
})

export const { fetchFavs, toggleFav, resetFavs, showModal, hideModal } = favSlice.actions;
export default favSlice.reducer;