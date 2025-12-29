import axios from "axios";

// All Hadiths
const API_URL =
  "https://aajerna-backend-wnau.vercel.app/api/hadiths";

// All books
// "/api/books?apiKey=$2y$10$9M4ro32nQOpKx6cVBSz0eerdF0jD7Ky7DKouhpiykIftruk";

// chapters of a book
// "/api/{bookSlug}/chapters?apiKey=$2y$10$9M4ro32nQOpKx6cVBSz0eerdF0jD7Ky7DKouhpiykIftruk"

export const getAllHadiths = (page = 1) => {
  return axios.get(`${API_URL}?page=${page}`);
};
