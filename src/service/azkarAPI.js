import axios from "axios";

// All azkar
const API_URL = "https://raw.githubusercontent.com/osamayy/azkar-db/refs/heads/master/azkar.json";

export const getAllAzkar = () => {
  return axios.get(API_URL);
}
