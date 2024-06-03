import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import miscReducer from "./slices/misc-slice";
import searchReducer from "./slices/search-slice";
import favReducer from "./slices/fav-slice";
import settingsReducer from "./slices/settings-slice";

export default configureStore({
    reducer: {
        auth: authReducer,
        misc: miscReducer,
        search: searchReducer,
        fav: favReducer,
        settings: settingsReducer
    }
})