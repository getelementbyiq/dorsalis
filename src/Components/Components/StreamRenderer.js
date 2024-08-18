import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ChunkRenderer from "./ChunkRenderer"; // Importieren Sie die ChunkRenderer-Komponente
import { model } from "../../firebase";

const StreamRenderer = ({ prompt }) => {
  const [chunks, setChunks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStream = async () => {
      try {
        // Ersetzen Sie `model.generateContentStream` durch Ihre Stream-Funktion
        const result = await model.generateContentStream(
          `requirement 1: generate content stream for prompt, ${prompt}`
        );

        let chunkArray = [];

        for await (const chunk of result.stream) {
          const chunkText = await chunk.text();
          chunkArray.push(chunkText);
          setChunks([...chunkArray]); // Setzen Sie den Zustand mit allen bisherigen Chunks
        }
      } catch (error) {
        console.error("Error fetching stream:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStream();
  }, [prompt]);

  return (
    <Box
      sx={{
        color: "#000",
      }}
    >
      {isLoading && <Typography>Loading...</Typography>}
      {chunks.length === 0 && !isLoading && (
        <Typography>No data available.</Typography>
      )}
      {chunks.map((chunk, index) => (
        <ChunkRenderer key={index} chunk={chunk} />
      ))}
    </Box>
  );
};

export default StreamRenderer;
