import axios from "axios";

export const getQiblaDirection = async (lat, lng) => {
  const response = await axios.get(`https://api.aladhan.com/v1/qibla/${lat}/${lng}`);
  return response.data.data.direction;
};