import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllSurahs,
  getSingleSurah,
  getSingleAyah,
  getReciters,
} from "../../service/quranAPI";

export const getAllSurahsAsync = createAsyncThunk(
  "quran/getAllSurahs",
  async () => {
    const response = await getAllSurahs();
    return response.data;
  }
);

export const getSingleSurahAsync = createAsyncThunk(
  "quran/getSingleSurah",
  async (surahNumber) => {
    const response = await getSingleSurah(surahNumber);
    return response.data;
  }
);

export const getSingleAyahAsync = createAsyncThunk(
  "quran/getSingleAyah",
  async (surahNumber, ayahNumber) => {
    const response = await getSingleAyah(surahNumber, ayahNumber);
    return response.data;
  }
);

export const getRecitersAsync = createAsyncThunk(
  "quran/getReciters",
  async () => {
    const response = await getReciters();
    return response.data;
  }
);

export const getAudioAsync = createAsyncThunk(
  "quran/getAudio",
  async()=> {
    const response = await getAudio();
    return response.data;
  }
)

const initialState = {
  surahs: [],
  surah: {},
  ayah: {},
  reciters: [],
  audio:{},
  loading: false,
  error: null,
};

const quranSlice = createSlice({
  name: "quran",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSurahsAsync.fulfilled, (state, action) => {
        state.surahs = action.payload;
        state.loading = false;
      })
      .addCase(getSingleSurahAsync.fulfilled, (state, action) => {
        state.surah = action.payload;
        state.loading = false;
      })
      .addCase(getSingleAyahAsync.fulfilled, (state, action) => {
        state.ayah = action.payload;
        state.loading = false;
      })
      .addCase(getRecitersAsync.fulfilled, (state, action) => {
        state.reciters = action.payload;
        state.loading = false;
      })
      .addCase(getAudioAsync.fulfilled , (state , action ) => {
        state.audio = action.payload;
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
