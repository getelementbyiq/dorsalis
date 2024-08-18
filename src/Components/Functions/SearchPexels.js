import { createClient } from "pexels";

const client = createClient(process.env.REACT_APP_PEXELS_KEY);

export const searchImages = async (query) => {
  try {
    const response = await client.photos.search({ query, per_page: 1 });
    return response.photos;
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
};
