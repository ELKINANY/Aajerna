import { configureStore } from "@reduxjs/toolkit";
import quranReducer from "./slices/quranSlice";

const store = configureStore({
    reducer: {
      quran: quranReducer,
    },
})

export default store
