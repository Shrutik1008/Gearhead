import axios from "axios";

const PEXELS_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

export const getCarImage = async (make, model) => {
  try {
    const res = await axios.get("https://api.pexels.com/v1/search", {
      params: {
        query: `${make} ${model}`,
        per_page: 1,
      },
      headers: {
        Authorization: PEXELS_KEY,
      },
    });

    return (
      res.data.photos[0]?.src?.medium ||
      "https://via.placeholder.com/300"
    );
  } catch {
    return "https://via.placeholder.com/300";
  }
};

export const getSliderImages = async () => {
  const res = await axios.get(
    "https://api.unsplash.com/search/photos",
    {
      params: { query: "sports car", per_page: 6 },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_KEY}`,
      },
    }
  );

  return res.data.results.map(img => img.urls.regular);
};
