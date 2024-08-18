import axios from "axios";

const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";
const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY; // Ersetze durch deinen Unsplash Access Key

export const searchImagesByUnsplash = async (query) => {
  console.log("query", query);
  try {
    const response = await axios.get(UNSPLASH_API_URL, {
      params: {
        query: query,
        per_page: 1,
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching photos from Unsplash:", error);
    return [];
  }
};
