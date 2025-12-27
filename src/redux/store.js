import { configureStore } from "@reduxjs/toolkit";
import quranReducer from "./slices/quranSlice";
import azkarReducer from "./slices/azkarSlice";

const store = configureStore({
    reducer: {
      quran: quranReducer,
      azkar: azkarReducer,
    },
})

export default store
