import axios from "axios";

// All Hadiths
const API_URL = "/api/hadiths/?apiKey=$2y$10$9M4ro32nQOpKx6cVBSz0eerdF0jD7Ky7DKouhpiykIftruk"

// All books
// "/api/books?apiKey=$2y$10$9M4ro32nQOpKx6cVBSz0eerdF0jD7Ky7DKouhpiykIftruk";

// chapters of a book
// "/api/{bookSlug}/chapters?apiKey=$2y$10$9M4ro32nQOpKx6cVBSz0eerdF0jD7Ky7DKouhpiykIftruk"

export const getAllHadiths = ()=> {
    return axios.get(API_URL)
}