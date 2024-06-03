import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    refresher: false,
    componentMode: null,
    currentPK: null,
    advertDetails: null,
    dashboardSide: true,
    tourDetails: null,
}

export const miscSlice = createSlice({
    name: "misc",
    initialState,
    reducers: {
        triggerRefresh: (state) => {
            state.refresher = !state.refresher
        },
        setComponentMode: (state, action) => {
            state.componentMode = action.payload;
        },
        setCurrentPK: (state, action) => {
            state.currentPK = action.payload;
        },
        setAdvertDetails: (state, action) => {
            state.advertDetails = action.payload;
        },
        toggleDashboardSide: (state) => {
            state.dashboardSide = !state.dashboardSide;
        },
        setTourDetails: (state, action) => {
            state.tourDetails = action.payload;
        },
    }
})

export const { triggerRefresh, setComponentMode, setCurrentPK, setAdvertDetails, toggleDashboardSide, setTourDetails } = miscSlice.actions;
export default miscSlice.reducer;