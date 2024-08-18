import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import { Box, Typography } from "@mui/material";

const WritingEffect = ({ searchEngineData }) => {
  const { answer, suggestions } = searchEngineData || {};
  const typedAnswerRef = useRef(null);
  const typedSuggestionsRefs = useRef([]);

  useEffect(() => {
    if (!answer || !suggestions) return; // Ensure data is available

    // Initializing Typed.js for the answer
    const typedAnswer = new Typed(typedAnswerRef.current, {
      strings: [answer],
      typeSpeed: 20, // Faster typing speed
      onComplete: () => {
        // Start typing each suggestion with a delay
        suggestions.forEach((suggestion, index) => {
          setTimeout(() => {
            const suggestionElement = typedSuggestionsRefs.current[index];
            new Typed(suggestionElement, {
              strings: [suggestion],
              typeSpeed: 20, // Faster typing speed
            });
          }, 500 + index * 1000); // Adjust delay between suggestions
        });
      },
    });

    // Cleanup on unmount
    return () => {
      typedAnswer.destroy();
      typedSuggestionsRefs.current.forEach(
        (typedInstance) => typedInstance && typedInstance.destroy()
      );
    };
  }, [answer, suggestions]);

  if (!answer || !suggestions) {
    return; // Render loading state if data is not available
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        mt: "16px",
        background: "#000",
        p: "16px",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h6" component="div" gutterBottom>
        <span ref={typedAnswerRef} />
      </Typography>
      <Box
        sx={{
          mt: "16px",
        }}
      >
        <Typography variant="subtitle1" component="div" gutterBottom>
          Suggestions:
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {suggestions.map((suggestion, index) => (
            <Typography key={index} variant="body1" component="div">
              <span ref={(el) => (typedSuggestionsRefs.current[index] = el)} />
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default WritingEffect;
