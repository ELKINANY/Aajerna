import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getAllAzkar } from "../../service/azkarAPI";

export const fetchAzkarAsync = createAsyncThunk("azkar/fetchAzkar", async () => {
    const response = await getAllAzkar();
    const formattedAzkar = response.data.rows.map((item, index) => ({
    id: index,
    category: item[0],
    text: item[1],
    description: item[2],
    count: item[3],
    source: item[4],
  }));
    return formattedAzkar;
});

const initialState = {
  azkar: [],
  loading: false,
  error: null,
}

const azkarSlice = createSlice({
  name: "azkar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAzkarAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAzkarAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.azkar = action.payload;
      })
      .addCase(fetchAzkarAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default azkarSlice.reducer;
