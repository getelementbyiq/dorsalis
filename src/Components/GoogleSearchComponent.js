// components/SearchComponent.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults } from "../app/Slices/googleSearchSlice";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  //   const results = useSelector((state) => state.search.results);
  const status = useSelector((state) => state.search.status);
  const error = useSelector((state) => state.search.error);
  const [results, setResults] = useState();

  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch("http://localhost:4040/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok" + response.statusText);
      }

      const data = await response.json();
      setResults(data);
      return data;
    } catch (error) {
      console.error("Error during fetch operation:", error);
      throw error;
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%) translate(50%)",
        right: "50%",
      }}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => fetchSearchResults(query)}>Search</button>

      {status === "loading" && <p>Loading...</p>}
      {status === "succeeded" && (
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <a href={result.link} target="_blank" rel="noopener noreferrer">
                {result.title}
              </a>
              <p>{result.snippet}</p>
              <pre>{result.scrape}</pre>
            </li>
          ))}
        </ul>
      )}
      {status === "failed" && <p>{error}</p>}
    </div>
  );
};

export default SearchComponent;
