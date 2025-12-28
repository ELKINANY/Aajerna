import axios from "axios";

const BASE_URL = "https://api.aladhan.com/v1/timings";

export const getPrayerTimes = async ({ lat, lon }) => {
  const response = await axios.get(BASE_URL, {
    params: {
      latitude: lat,
      longitude: lon,
      method: 5, // Egyptian General Authority
    },
  });

  return response.data;
};
