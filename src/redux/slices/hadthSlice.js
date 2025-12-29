import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllHadiths } from "../../service/hadithAPI";

import { getDailyHadithIndexInfo } from "../../utils/hadithDateUtils";

export const getAllHadithAsync = createAsyncThunk(
  "hadith/getAllHadith",
  async () => {
    const response = await getAllHadiths();
    return response.data;
  }
);

export const getDailyHadithAsync = createAsyncThunk(
  "hadith/getDailyHadith",
  async () => {
    const { targetPage, indexInPage } = getDailyHadithIndexInfo();
    const response = await getAllHadiths(targetPage);

    // The API might return data in a slightly nested structure
    const pageData = response.data.hadiths.data;
    const dailyHadith = pageData[indexInPage] || pageData[0];

    return dailyHadith;
  }
);

const initialState = {
  hadiths: [],
  dailyHadith: null,
  loading: false,
  error: null,
};

const hadithSlice = createSlice({
  name: "hadith",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllHadithAsync.fulfilled, (state, action) => {
        state.hadiths = action.payload;
        state.loading = false;
      })
      .addCase(getAllHadithAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllHadithAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getDailyHadithAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDailyHadithAsync.fulfilled, (state, action) => {
        state.dailyHadith = action.payload;
        state.loading = false;
      })
      .addCase(getDailyHadithAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default hadithSlice.reducer;
