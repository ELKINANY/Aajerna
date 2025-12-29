import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPrayerTimes } from "../../service/prayer_timesAPI";

export const fetchPrayerTimesAsync = createAsyncThunk(
  "prayerTimes/fetchPrayerTimes",
  async ({ lat, lon }) => {
    const response = await getPrayerTimes({ lat, lon });
    return response; // getPrayerTimes already returns response.data
  }
);

const initialState = {
  prayerTimes: null,
  loading: false,
  error: null,
};

const prayerTimesSlice = createSlice({
  name: "prayerTimes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrayerTimesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPrayerTimesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.prayerTimes = action.payload;
      })
      .addCase(fetchPrayerTimesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default prayerTimesSlice.reducer;
