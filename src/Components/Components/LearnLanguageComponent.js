import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Avatar, Box, InputBase, styled, Typography } from "@mui/material";
import { model } from "../../firebase";
import LBG from "../../assets/images/openart-image_l7sBShUT_1722441267778_raw.png";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { BootstrapTooltip } from "./Tooltip";

const LearnLanguageComponent = ({ responseLangLearning, userData }) => {
  console.log("responseLangLearning", responseLangLearning);
  const { languages } = userData;

  const [selectedWords, setSelectedWords] = useState({});
  const [selectedLevelIndex, setSelectedLevelIndex] = useState(0);
  const [hoveredWord, setHoveredWord] = useState(null);
  const [translatedWord, setTranslatedWord] = useState();
  const [context, setContext] = useState();

  console.log("selectedWords", selectedWords);
  console.log("selectedWords", hoveredWord);
  //   console.log("translatedWord", translatedWord);

  const handleWordClick = (key, word) => {
    console.error("this is infinity------------1");
    setSelectedWords((prev) => ({ ...prev, [key]: word }));
  };

  const handleChooseWord = (word) => {
    if (hoveredWord === word) {
      console.error("this is infinity------------2");

      setHoveredWord(null);
    } else {
      console.error("this is infinity------------3");

      setHoveredWord(word);
    }
  };
  //------------------------------------------------------Word Translator
  async function translateTheWord(prompt) {
    // Generate content stream with the provided prompt
    console.error("this is infinity------------4");

    const result = await model.generateContentStream(
      `requirement 0: create JSON {word, translations}
        requirement 1: word = the word from promt
        requirement 2: translate the word in
          ${languages && languages[1]}, based on context.
        requirement 3: put 3 other synonyme of translated word in to translations
           ${languages && languages[0]},

        }, ${(prompt, context)}`
    );

    let chunks = [];

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();

      chunks.push(chunkText);
    }

    const completeResponse = chunks.join("").trim();
    try {
      // Cleaning the JSON response
      const cleanResponse = completeResponse
        .replace(/```json|```/g, "") // Remove markdown JSON delimiters
        .replace(/(\r\n|\n|\r)/gm, "") // Remove newlines
        .replace(/\s{2,}/g, " ") // Remove extra spaces
        .replace(/,(\s*])/, "]"); // Remove trailing commas

      // Try to parse the cleaned response
      let jsonObjects;

      try {
        jsonObjects = JSON.parse(cleanResponse); // Versuchen, die bereinigte Antwort zu parsen

        setTranslatedWord(jsonObjects);
      } catch (parseError) {
        console.error(
          "Error parsing JSON response:",
          parseError,
          cleanResponse
        );
        return null; // Rückgabe von null bei JSON Parsing Fehler
      }
    } catch (error) {
      console.error("Error generating content stream:", error);
      return null; // Rückgabe von null bei Fehlern während der Stream-Erzeugung
    }
  }
  //------------------------------------------------------Mode Detection
  async function modeDetection(prompt) {
    // Generate content stream with the provided prompt
    console.error("this is infinity------------4");

    const result = await model.generateContentStream(
      `requirement 0: there are 3 types of modes = search, dev, learning.
       requirement 1: detect the mode from the promt.
       requirement 2: RESPONSE JSON {mode: "detected mode"},
       requirement 3: RESPONSE JUST JSON, without suggestions or questions,
        }, ${prompt}`
    );

    let chunks = [];

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();

      chunks.push(chunkText);
    }

    const completeResponse = chunks.join("").trim();
    try {
      // Cleaning the JSON response
      const cleanResponse = completeResponse
        .replace(/```json|```/g, "") // Remove markdown JSON delimiters
        .replace(/(\r\n|\n|\r)/gm, "") // Remove newlines
        .replace(/\s{2,}/g, " ") // Remove extra spaces
        .replace(/,(\s*])/, "]"); // Remove trailing commas

      // Try to parse the cleaned response
      let jsonObjects;

      try {
        jsonObjects = JSON.parse(cleanResponse); // Versuchen, die bereinigte Antwort zu parsen

        setTranslatedWord(jsonObjects);
      } catch (parseError) {
        console.error(
          "Error parsing JSON response:",
          parseError,
          cleanResponse
        );
        return null; // Rückgabe von null bei JSON Parsing Fehler
      }
    } catch (error) {
      console.error("Error generating content stream:", error);
      return null; // Rückgabe von null bei Fehlern während der Stream-Erzeugung
    }
  }
  //------------------------------------------------------Mode Detection

  //   useEffect(() => {
  //     console.error("this is infinity------------5");
  //     if (hoveredWord === null) {
  //       return null;
  //     } else {
  //       const result = translateTheWord(hoveredWord);
  //     }
  //   }, [hoveredWord]);

  //   const renderTextWithWords = (text, selectedWords) => {
  //     const parts = text.split(/(#\d+)/);
  //     // console.error("this is infinity------------6");
  //     console.log("this is infinity------------text", text);
  //     console.log("this is infinity------------selectedWords", selectedWords);
  //     // setContext(text);
  //     return parts
  //       .map((part, index) => {
  //         if (part.match(/#\d+/)) {
  //           // This part is a placeholder
  //           const placeholderIndex = parseInt(part.slice(1));
  //           return (
  //             <Box
  //               //   onClick={() => handleChooseWord(selectedWords[placeholderIndex])}
  //               key={`word-${index}`}
  //               sx={{
  //                 display: "flex",
  //                 px: "4px",
  //                 py: "2px",
  //                 backgroundColor: "#5FADA4",
  //                 borderRadius: "16px",
  //                 minWidth: "80px",
  //                 alignItems: "center",
  //                 justifyContent: "center",
  //                 my: "2px",
  //                 color: "#fff",
  //               }}
  //             >
  //               <Typography>
  //                 {selectedWords[placeholderIndex] || placeholderIndex + 1}
  //               </Typography>
  //             </Box>
  //           );
  //         } else {
  //           // This part is regular text
  //           return part.split(" ").map((word, wordIndex) => (
  //             <Box
  //               onClick={() => handleChooseWord(word)}
  //               key={`part-${index}-word-${wordIndex}`}
  //               sx={{
  //                 display: "flex",
  //                 alignItems: "center",
  //                 cursor: "pointer",
  //                 px: "2px",
  //                 transition: "200ms",
  //                 "&&:hover": {
  //                   background: "rgba(0,0,0,0.2)",
  //                   borderRadius: "8px",
  //                   color: "blue",
  //                   px: "2px",
  //                 },
  //               }}
  //             >
  //               <Typography
  //                 sx={{
  //                   textWrap: "nowrap",
  //                   textAlign: "start",
  //                   color: "#000",
  //                 }}
  //               >
  //                 {word}
  //               </Typography>
  //             </Box>
  //           ));
  //         }
  //       })
  //       .flat();
  //   };

  const renderTextWithWords = (text, selectedWords) => {
    const parts = text.split(/(#\d+)/);

    // Debugging-Ausgaben
    console.log("Text:", text);
    console.log("Selected Words:", selectedWords);

    return parts
      .map((part, index) => {
        if (part.match(/#\d+/)) {
          // Dieser Teil ist ein Platzhalter
          const placeholderIndex = parseInt(part.slice(1)); // #0 -> 0
          const placeholderKey = `#${placeholderIndex}`;
          const word = selectedWords[placeholderKey] || placeholderIndex + 1; // Fallback

          return (
            <Box
              key={`word-${index}`} // Unique key for each placeholder
              sx={{
                display: "flex",
                px: "4px",
                py: "2px",
                backgroundColor: "#5FADA4",
                borderRadius: "16px",
                minWidth: "80px",
                alignItems: "center",
                justifyContent: "center",
                my: "2px",
                color: "#fff",
              }}
            >
              <Typography>{word}</Typography>
            </Box>
          );
        } else {
          // Dieser Teil ist normaler Text
          return part.split(" ").map((word, wordIndex) => (
            <Box
              onClick={() => handleChooseWord(word)} // Handle click event
              key={`part-${index}-word-${wordIndex}`} // Unique key for each word
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                px: "2px",
                transition: "200ms",
                "&&:hover": {
                  background: "rgba(0,0,0,0.2)",
                  borderRadius: "8px",
                  color: "blue",
                  px: "2px",
                },
              }}
            >
              <Typography
                sx={{
                  textWrap: "nowrap",
                  textAlign: "start",
                  color: "#000",
                }}
              >
                {word}
              </Typography>
            </Box>
          ));
        }
      })
      .flat(); // Flatten the array of arrays
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        // border: "1px solid red",
        flexDirection: "column",
        pt: "4px",
      }}
    >
      {Object.values(responseLangLearning).map(
        (level, levelIndex) =>
          //   &&
          levelIndex === selectedLevelIndex && (
            <Box
              key={levelIndex}
              sx={{
                display: "flex",
                width: "60%",
                backgroundColor: "#fff",
                borderRadius: "16px",
                margin: "0 auto",
                padding: "4px",
                flexDirection: "column",
                mb: "16px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  p: "4px",
                  background:
                    "linear-gradient(180deg, #afebe4 0%, #9ed3cd 100%)",
                  //   border: "1px solid red",
                  borderRadius: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    //   justifyContent: "center",
                    p: "16px",
                    backgroundColor: "rgba(225,225,225,0.2)",
                    borderRadius: "8px",
                    pl: "24px",
                    // border: "1px solid red",
                  }}
                >
                  {renderTextWithWords(level.text, selectedWords)}
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  //   border: "1px solid red",
                  justifyContent: "center",
                  mt: "20px",
                }}
              >
                {Object.entries(level.words)?.map(([key, wordArray], index) => (
                  <Box
                    key={key}
                    sx={{
                      display: "flex",
                      gap: "4px",
                      alignItems: "center",
                      border: "1px solid rgba(0,0,0,0.4)",
                      p: "4px",
                      borderRadius: "32px",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: "24px",
                        height: "24px",
                        background: "#EDEDED",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "black",
                        }}
                      >
                        {index + 1}
                      </Typography>
                    </Avatar>

                    {/* {wordArray.map((word, index) => (
                      <Box
                        key={index}
                        onClick={() => handleWordClick(key, word)}
                        sx={{
                          display: "flex",
                          px: "16px",
                          py: "2px",
                          background:
                            selectedWords[key] === word ? "#5FADA4" : "#EDEDED",
                          color: selectedWords[key] === word ? "white" : "#000",
                          cursor: "pointer",
                          transform: "150ms",
                          "&&:hover": {
                            backgroundColor: "#AFEBE4",
                          },
                          borderRadius: "16px",
                        }}
                      >
                        <Typography>{word}</Typography>
                      </Box>
                    ))} */}
                    {Array.isArray(wordArray) ? (
                      wordArray.map((word, index) => (
                        <Box
                          key={index}
                          onClick={() => handleWordClick(key, word)}
                          sx={{
                            display: "flex",
                            px: "16px",
                            py: "2px",
                            background:
                              selectedWords[key] === word
                                ? "#5FADA4"
                                : "#EDEDED",
                            color:
                              selectedWords[key] === word ? "white" : "#000",
                            cursor: "pointer",
                            transform: "150ms",
                            "&&:hover": {
                              backgroundColor: "#AFEBE4",
                            },
                            borderRadius: "16px",
                          }}
                        >
                          <Typography>{word}</Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography>Fehler: wordArray ist kein Array.</Typography>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          )
      )}

      {/* <Box
        sx={{
          display: "flex",
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "4px",
          flexDirection: "column",
          mb: "16px",
          width: "15%",
          gap: "4px",
        }}
      >
        {Object.keys(responseLangLearning).map((level, levelIndex) => (
          <Box
            onClick={() => setSelectedLevelIndex(levelIndex)}
            key={levelIndex}
            sx={{
              display: "flex",
              color: selectedLevelIndex === levelIndex ? "#fff" : "#000",
              backgroundColor:
                selectedLevelIndex === levelIndex ? "#5FADA4" : "#EDEDED",
              cursor: "pointer",
              borderRadius: "32px",
              justifyContent: "flex-end",
              px: "16px",
              py: "8px",
            }}
          >
            <Typography>{level}</Typography>
          </Box>
        ))}
      </Box> */}
    </Box>
  );
};

LearnLanguageComponent.propTypes = {
  responseLangLearning: PropTypes.object.isRequired,
};

export default LearnLanguageComponent;
