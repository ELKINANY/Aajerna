import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllHadiths } from "../../service/hadithAPI";

export const getAllHadithAsync = createAsyncThunk(
  "quran/getAllHadith",
  async () => {
    const response = await getAllHadiths();
    console.log('Full API Response:', response);
    console.log('Response data:', response.data);
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
      .addMatcher(
        (action) => action.type.endsWith("pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("rejected"),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export default quranSlice.reducer;
