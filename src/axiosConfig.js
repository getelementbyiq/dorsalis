// src/axiosConfig.js
import axios from "axios";

// Erstelle eine Instanz von Axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:4040", // Basis-URL für deine API
  timeout: 10000, // Timeout für Anfragen
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
