import React from "react";
import { Box, Typography } from "@mui/material";

// Funktion zur Anwendung von Stilen
const applyStyles = (text, styles) => {
  let elements = [];
  let lastIndex = 0;

  styles.forEach((style) => {
    const { offset, length, style: styleType } = style;
    if (lastIndex < offset) {
      elements.push(text.slice(lastIndex, offset));
    }
    let segment = text.slice(offset, offset + length);
    if (styleType === "BOLD") {
      segment = <strong key={offset}>{segment}</strong>;
    }
    if (styleType === "ITALIC") {
      segment = <em key={offset}>{segment}</em>;
    }
    if (styleType === "UNDERLINE") {
      segment = <u key={offset}>{segment}</u>;
    }
    elements.push(segment);
    lastIndex = offset + length;
  });

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements;
};

// Funktion zur Umwandlung der JSON-Daten in HTML
const renderNote = (note) => {
  return note.blocks.map((block) => {
    const styledText = applyStyles(block.text, block.inlineStyleRanges);
    return (
      <Typography
        key={block.key}
        variant="body1"
        component="div"
        sx={{ marginBottom: 1 }}
      >
        {styledText}
      </Typography>
    );
  });
};

// NoteRenderer-Komponente
const NoteRenderer = ({ noteData }) => {
  // Parsen und Bereinigen der JSON-Daten
  let parsedData = {};
  try {
    parsedData = JSON.parse(noteData);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return (
      <Typography variant="body1" color="error">
        Invalid note data
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
      {renderNote(parsedData)}
    </Box>
  );
};

export default NoteRenderer;
