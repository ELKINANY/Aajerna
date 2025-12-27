import axios from "axios";

// All Surahs
const API_URL = "https://quranapi.pages.dev/api";

// "https://quranapi.pages.dev/api/surah.json";
export const getAllSurahs = () => {
  return axios.get(`${API_URL}/surah.json`);
}

// Single Surah
// "https://quranapi.pages.dev/api/{surahNumber}.json";
export const getSingleSurah = (surahNumber) => {
  return axios.get(`${API_URL}/${surahNumber}.json`);
}

// Single Ayah
// "https://quranapi.pages.dev/api/{surahNumber}/{ayahNumber}.json";
export const getSingleAyah = (surahNumber, ayahNumber) => {
  return axios.get(`${API_URL}/${surahNumber}/${ayahNumber}.json`);
}

// Reciters
// "https://quranapi.pages.dev/api/reciters.json";
export const getReciters = () => {
  return axios.get(`${API_URL}/reciters.json`);
}
