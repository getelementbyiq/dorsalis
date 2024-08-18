import React, { useEffect, useRef, useState } from "react";

import { Box, Button, Grid, Typography } from "@mui/material";
import FlipCard from "./FlipcardComponent";
import { Masonry } from "@mui/lab";

const WordsComponent = ({ words }) => {
  console.log("words from component", words.imageUrl);
  const [slideState, setSlideState] = useState(0);

  const handleState = () => {
    if (slideState === 1) {
      setSlideState(0);
    } else {
      setSlideState(1);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        border: "1px solid red",
        justifyContent: "center",
        flexGrow: "1",
        mt: "32px",
        mb: "50px",
      }}
    >
      <Box
        sx={{
          px: "16px",
          display: "flex",
          overflow: "auto",
          flexGrow: "1",
          border: "1px solid red",
        }}
      >
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3 }}
          spacing={2}
          sx={{ m: "0 auto" }}
        >
          {words?.map((word, wordIndex) => (
            <FlipCard
              frontContent={word.secondLanguage.word}
              backContent={word.firstLanguage.word}
              imageUrl={word.imageUrl}
            />
          ))}
        </Masonry>
      </Box>
      {/* <Box
        sx={{
          display: "flex",
          width: "20%",
          border: "1px solid red",
          height: "100vh",
        }}
      ></Box> */}
    </Box>
  );
};

export default WordsComponent;
