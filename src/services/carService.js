import axios from "axios";

const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;

export const getCarsByMake = async (make, limit = 8) => {
  const response = await axios.get(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${make}`,
    {
      headers: {
        "x-rapidapi-key": RAPID_API_KEY,
        "x-rapidapi-host": "cars-by-api-ninjas.p.rapidapi.com",
      },
    }
  );

  return response.data.slice(0, limit);
};
