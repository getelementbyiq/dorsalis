import React from "react";
import { formatText } from "../Functions/TextFormater";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { Theme } from "./../../Theme";
import { PlusOne } from "@mui/icons-material";

const ChunkRenderer = ({ chunk }) => {
  const formattedChunk = formatText(chunk);
  console.log("formattedChunk", formattedChunk);
  console.log("chunk", chunk);

  return (
    <Box sx={{ width: "100%", maxWidth: 800, margin: "auto" }}>
      {Object.entries(chunk)?.map(([chapter, details], index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<PlusOne />}
            aria-controls={`panel${index}a-content`}
            id={`panel${index}a-header`}
          >
            <Typography>{chapter}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{details.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ChunkRenderer;
