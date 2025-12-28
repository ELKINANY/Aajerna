import { configureStore } from "@reduxjs/toolkit";
import quranReducer from "./slices/quranSlice";
import azkarReducer from "./slices/azkarSlice";
import hadithReducer from "./slices/hadthSlice";
import prayerTimesReducer from "./slices/prayerTimesSlice"

const store = configureStore({
    reducer: {
      quran: quranReducer,
      azkar: azkarReducer,
      hadith: hadithReducer,
      prayerTimes: prayerTimesReducer,
    },
})

export default store
