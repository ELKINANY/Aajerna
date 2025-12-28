import { configureStore } from "@reduxjs/toolkit";
import quranReducer from "./slices/quranSlice";
import azkarReducer from "./slices/azkarSlice";
import hadithReducer from "./slices/hadthSlice";

const store = configureStore({
    reducer: {
      quran: quranReducer,
      azkar: azkarReducer,
      hadith: hadithReducer,
    },
})

export default store
