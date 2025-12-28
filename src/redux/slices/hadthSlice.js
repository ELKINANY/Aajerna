import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllHadiths } from "../../service/hadithAPI";

export const getAllHadithAsync = createAsyncThunk(
  "quran/getAllHadith",
  async () => {
    const response = await getAllHadiths();
    return response.data;
  }
);


const initialState = {
  hadiths: [],
  random: [],
  loading: false,
  error: null,
};

const quranSlice = createSlice({
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
      });
  },
});

export default quranSlice.reducer;
