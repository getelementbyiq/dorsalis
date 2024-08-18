import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, InputBase, Typography } from "@mui/material";

const FlipCard = ({ frontContent, backContent, imageUrl }) => {
  const [flipped, setFlipped] = useState(false);

  const [inputWord, setInputWord] = useState("");

  console.log("imgUrl", imageUrl);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  useEffect(() => {
    if (frontContent.slice() === inputWord.slice()) {
      setFlipped(!flipped);
    }
  }, [inputWord, backContent]);

  const handleInputChange = (event) => {
    const word = event.target.value.toLowerCase();
    setInputWord(word);
  };
  return (
    <Box
      key={imageUrl}
      sx={{
        perspective: "1000px",
        width: "200px",
        height: "200px",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0)",
        }}
      >
        <Box
          //   onClick={handleFlip}
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            borderRadius: "16px",
            backgroundColor: "#F4F4F4",
            p: "4px",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                height: "150px",
                overflow: "hidden",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            >
              <img
                src={imageUrl}
                alt=""
                style={{ width: "100%", objectFit: "cover" }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                // border: "1px solid red",
                gap: "8px",
                alignItems: "center",
                mt: "8px",
              }}
            >
              {/* <Typography
                sx={{
                  fontSize: "1.2vw",
                }}
              >
                {backContent}
              </Typography> */}
              <Box
                sx={{
                  width: "80%",
                  borderRadius: "32px",
                  backgroundColor: "#fff",
                  pl: "24px",
                }}
              >
                <InputBase
                  //   value={inputWord}
                  onChange={handleInputChange}
                  fullWidth
                  placeholder={`translate ${frontContent}`}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Card
          onClick={handleFlip}
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: "#7FFF84",
            borderRadius: "16px",
          }}
        >
          <CardContent>
            <Typography
              sx={{
                fontSize: "1.2vw",
              }}
            >
              {backContent}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default FlipCard;
