import axios from "axios";

const GOOGLE_CUSTOM_SEARCH_API_URL =
  "https://www.googleapis.com/customsearch/v1";
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY; // Ersetze durch deinen Google API Key
const GOOGLE_CX = process.env.REACT_APP_GOOGLE_CX; // Ersetze durch deine Custom Search Engine ID

export const searchByGoogle = async (query) => {
  console.log("Query:", query);
  try {
    const response = await axios.get(GOOGLE_CUSTOM_SEARCH_API_URL, {
      params: {
        key: GOOGLE_API_KEY,
        cx: GOOGLE_CX,
        q: query,
        num: 1,
      },
    });

    return response.data.items;
  } catch (error) {
    console.error("Error fetching photos from Google:", error);
    return [];
  }
};
