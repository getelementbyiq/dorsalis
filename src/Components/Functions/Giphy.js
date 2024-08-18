import axios from "axios";

export const handleSearchGiphy = async (query) => {
  try {
    const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
      params: {
        api_key: process.env.REACT_APP_GIPHY_API_KEY,
        q: query,
        limit: 1,
      },
    });
    console.log("giphy", response.data.data);
    return response.data.data;
  } catch (err) {
    console.log("Fehler bei der Suche. Bitte versuche es später erneut.");
  }
};
