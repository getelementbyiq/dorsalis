import React, { useEffect, useState } from "react";
import { Avatar, Box, Grid, IconButton, InputBase } from "@mui/material";
import GoogleDocs from "../NewTextEditor/GoogleDocs";
import CustomTextEditorAdvenced from "../NewTextEditor/AdvencedEditor";
import TldrawComponent from "../NewTextEditor/NewTextEditor";
import Whiteboard from "../NewTextEditor/KonvaEditor";
import Collector from "../CodepenClone/Collector";
import LearnLanguageComponent from "../LearnLanguageComponent";
import { model } from "../../../firebase";
import { searchImagesByGoogle } from "../../Functions/GoogleImageSearch";
import { setData } from "../../../app/Slices/recievedData";
import { useDispatch } from "react-redux";
import WordsComponent from "../WordsComponent";

const ELearningComponent = (props) => {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState([]);
  const [responseLangLearning, setResponseLangLearning] = useState([]);
  const [words, setWords] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [updatedWords, setUpdatedWords] = useState([]);
  const [promt, setPromt] = useState("");
  const [cloeseChat, setCloseChat] = useState(false);

  const handleChange = (event) => {
    setPromt(event.target.value);
  };

  //Put Images to Words
  useEffect(() => {
    if (words.length > 0) {
      const fetchImages = async () => {
        const newResponse = await Promise.all(
          words.map(async (item) => {
            // const photos = await searchImages(item.promt);
            // const photos = await searchImagesByUnsplash(item.promt);
            const photos = await searchImagesByGoogle(item.firstLanguage.word);
            console.log("photos", photos);
            // console.log("photosShuterstock", photosShuterstock);
            const imageUrl = photos?.length > 0 ? photos[0]?.link : "";
            // const giphy = photos?.length > 0 ? photos[0] : "";
            const itemData = { item: { ...item, imageUrl }, photos };
            setSearchData([...searchData, itemData]);
            return { ...item, imageUrl };
          })
        );
        setUpdatedWords(newResponse);
      };

      fetchImages();
    }
  }, [words]);
  const generateWordsss = async (promt) => {
    let result;
    result = languageDetection(promt);
    generateWords(promt);
  };
  const generateText = async (promt) => {
    let result;

    // Run the first function
    result = languageDetection(promt);

    // Introduce a delay before running the second function
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2000 milliseconds = 2 seconds

    // Run the second function
    runLanguageLearning(promt);
  };

  async function languageDetection(prompt) {
    // Generate content stream with the provided prompt
    const result = await model.generateContentStream(
      `requirement 0: detect the langugae af Promt, and the language wich is in request to learn,
      requirement 1: create JSON with languages:[promtLanguage, requestLanguage],
      requirement 2: if, there are other requesting things, like occupation, or proffession, then create also KEY in JSON
      requirement 3: response JUST THE JSON, without any questions or suggestions
        }, ${prompt}`
      // prompt
    );
    // requiremnt 2: create an key inside of obect caled promt, generate promt so that ist short but clear to search this object is"

    let chunks = [];

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();

      console.log("Received chunk: ", chunkText); // Logging the received chunk
      chunks.push(chunkText);
    }

    console.log("chunks", chunks);
    // Combine all chunks into a single string
    //   let completeResponse = chunks.join("");
    let status = false;
    console.log("status", status);
    const completeResponse = chunks.join("").trim();
    console.log("Complete response: ", completeResponse);
    let resultObject;
    try {
      // Cleaning the JSON response
      const cleanResponse = completeResponse
        .replace(/```json|```/g, "") // Remove markdown JSON delimiters
        .replace(/^\s+|\s+$/gm, "") // Trim leading and trailing spaces
        .replace(/(\r\n|\n|\r)/gm, "") // Remove newlines
        .replace(/\s{2,}/g, " "); // Remove extra spaces
      // .replace(/```json|```/g, "") // Remove markdown JSON delimiters
      // .replace(/^\s+|\s+$/gm, "") // Trim leading and trailing spaces
      // .replace(/(\r\n|\n|\r)/gm, "") // Remove newlines
      // .replace(/\s{2,}/g, " "); // Remove extra spaces

      // .replace(/```json|```/g, "") // Remove markdown JSON delimiters
      // .replace(/(\r\n|\n|\r)/gm, "") // Remove newlines
      // .replace(/,(\s*])/, "]"); // Remove trailing commas

      // Try to parse the cleaned response
      let jsonObjects;

      try {
        jsonObjects = JSON.parse(cleanResponse); // Versuchen, die bereinigte Antwort zu parsen
        console.log("Parsed JSON: ", jsonObjects);
        // jsonObjects = jsonObjects.map((obj) => ({ ...obj, id: uuidv4() })); // Füge UUIDs hinzu
        // console.log("Updated JSON objects with UUIDs: ", jsonObjects);
        setUserData(jsonObjects);
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

  //-----------------------------------------Learning Fetch
  async function runLanguageLearning(prompt) {
    // Generate content stream with the provided prompt
    const result = await model.generateContentStream(
      `requirement 0: create 3 JSON {starter:{text, words }, medium:{text, words}, intermediate:{text, words}}
       requirement 1: starter : create text inside the text key, without 8 words, but mark this places with Numbers starting #0 (index), create in key words for each number the right word and 2 other total diferent words, and 1 of them is right for this place. Text about simple Ideas, with 250 Words, .
       requirement 2: medium : create text inside the text key, without 10 words, but mark this places with Numbers starting #0 (index), create in key words for each number the right word and 2 other total diferent words, and 1 of them is right for this place. Text about medium Ideas, with 250 Words, .
       requirement 3: intermediate : create text inside the text key, without 12 words, but mark this places with Numbers starting #0 (index), create in key words for each number the right word and 2other total diferent words, and 1 of them is right for this place. Text about intermediate Ideas, with 250 Words,.
       requirement 4: the STRUCTURE of WORDs:{#0:[word1, word2, word3],#1....}.
       requirement 5: Response just JSON, without any other TEXT, or additional Advices or Questions.
       requirement 6: generate text in the language of reqruest for learning.
       requirement 6: FOLOW THIS QERUIREMENTS.
        }, ${prompt}`
      // prompt
    );
    // requiremnt 2: create an key inside of obect caled promt, generate promt so that ist short but clear to search this object is"

    let chunks = [];

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();

      console.log("Received chunk: ", chunkText); // Logging the received chunk
      chunks.push(chunkText);
    }

    console.log("chunks", chunks);
    // Combine all chunks into a single string
    //   let completeResponse = chunks.join("");
    let status = false;
    console.log("status", status);
    const completeResponse = chunks.join("").trim();
    console.log("Complete response: ", completeResponse);
    let resultObject;
    try {
      // Cleaning the JSON response
      const cleanResponse = completeResponse
        .replace(/```json|```/g, "") // Remove markdown JSON delimiters
        .replace(/^\s+|\s+$/gm, "") // Trim leading and trailing spaces
        .replace(/(\r\n|\n|\r)/gm, "") // Remove newlines
        .replace(/\s{2,}/g, " ") // Remove extra spaces
        .replace(/Complete response:\s*/, "");
      // .replace(/```json|```/g, "") // Remove markdown JSON delimiters
      // .replace(/(\r\n|\n|\r)/gm, "") // Remove newlines
      // .replace(/,(\s*])/, "]"); // Remove trailing commas

      // Try to parse the cleaned response
      let jsonObjects;

      try {
        jsonObjects = JSON.parse(cleanResponse); // Versuchen, die bereinigte Antwort zu parsen
        console.log("Parsed JSON: ", jsonObjects);
        // jsonObjects = jsonObjects.map((obj) => ({ ...obj, id: uuidv4() })); // Füge UUIDs hinzu
        // console.log("Updated JSON objects with UUIDs: ", jsonObjects);
        setResponseLangLearning(jsonObjects);
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

  //-----------------------------------------Generate Words
  async function generateWords(prompt) {
    // Generate content stream with the provided prompt
    const result = await model.generateContentStream(
      `requirement 0: detect the langugae af Promt - :"firstLanguage", and the language wich is in request to learn - :"secondLanguage", 
          requirement 1: create JSON with words [{firstLanguage:{word, article},secondLanguage:{word, article}}...]
          requirement 2: Response JUST JSON, no questions, no suggestions
            }, ${prompt}`
      // prompt
    );

    // requirement 0: detect the langugae af Promt - :"firstLanguage", and the language wich is in request to learn - :"secondLanguage", create 1 sentence as example in firstLanguage, and translate it in to secondLanguage
    //     requirement 1: create JSON with words [{firstLanguage:{word, article, firstLanguageSentence},secondLanguage:{word, article, secondLanguageSentence}}...]
    //     requirement 2: Response JUST JSON, no questions, no suggestions

    let chunks = [];

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();

      console.log("Received chunk: ", chunkText); // Logging the received chunk
      chunks.push(chunkText);
    }

    console.log("chunks", chunks);
    // Combine all chunks into a single string
    //   let completeResponse = chunks.join("");
    let status = false;
    console.log("status", status);
    const completeResponse = chunks.join("").trim();
    console.log("Complete response: ", completeResponse);
    let resultObject;
    try {
      // Cleaning the JSON response
      const cleanResponse = completeResponse
        .replace(/```json|```/g, "") // Remove markdown JSON delimiters
        .replace(/^\s+|\s+$/gm, "") // Trim leading and trailing spaces
        .replace(/(\r\n|\n|\r)/gm, "") // Remove newlines
        .replace(/\s{2,}/g, " "); // Remove extra spaces
      // .replace(/```json|```/g, "") // Remove markdown JSON delimiters
      // .replace(/^\s+|\s+$/gm, "") // Trim leading and trailing spaces
      // .replace(/(\r\n|\n|\r)/gm, "") // Remove newlines
      // .replace(/\s{2,}/g, " "); // Remove extra spaces

      // .replace(/```json|```/g, "") // Remove markdown JSON delimiters
      // .replace(/(\r\n|\n|\r)/gm, "") // Remove newlines
      // .replace(/,(\s*])/, "]"); // Remove trailing commas

      // Try to parse the cleaned response
      let jsonObjects;

      try {
        jsonObjects = JSON.parse(cleanResponse); // Versuchen, die bereinigte Antwort zu parsen
        console.log("Parsed JSON: ", jsonObjects);
        // jsonObjects = jsonObjects.map((obj) => ({ ...obj, id: uuidv4() })); // Füge UUIDs hinzu
        // console.log("Updated JSON objects with UUIDs: ", jsonObjects);
        setWords(jsonObjects);
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

  const toggleChat = () => {
    setCloseChat((open) => !open);
  };
  return (
    <Grid
      container
      style={{
        display: "flex",
        flexGrow: "1",
        background: "#B5F1E3",
        justifyContent: "center",
        alignItems: "center",
      }} // Sicherstellen, dass das Grid die volle Höhe und Breite einnimmt
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pr: "8px",
          pl: "8px",
          backgroundColor: "#F8FAFF",
          borderRadius: "16px",
          width: "40%",
          position: "fixed",
          zIndex: "4001",
          transition: "400ms",
          bottom: cloeseChat ? "-56px" : "8px",
          right: "50%",
          transform: "translate(50%)",
          flexDirection: "column",

          // border: "1px solid red",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            onClick={toggleChat}
            sx={{
              width: "50px",
              height: "6px",
              borderRadius: "6px",
              background: "#B5F1E3",
              position: "relative",
              transform: "translateY(-16px)",
              border: "2px solid #fff",
              transition: "300ms",
              cursor: "pointer",
              "&&:hover": {
                transform: " translateY(-16px) scale(1.2)",
              },
            }}
          ></Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: "8px",
            visibility: cloeseChat ? "hidden" : "visible",
            pb: "4px",
          }}
        >
          <Avatar
            sx={{
              background: "transparent",
              mb: "4px",
            }}
          >
            <svg
              width="27"
              height="24"
              viewBox="0 0 27 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.25741 16.5085C11.194 17.7543 13.5722 18.2287 15.8794 17.7651C14.8913 19.0309 13.554 19.899 12.0931 20.3187C10.7688 19.4012 9.76174 18.0646 9.25741 16.5085ZM8.09427 14.7737C7.74444 14.3549 7.43572 13.8907 7.17731 13.384C5.98946 11.0548 6.15195 8.39209 7.37519 6.2882C9.3703 5.51933 11.673 5.62035 13.6581 6.7317C10.5017 8.0269 8.22824 11.0755 8.09644 14.707C8.09564 14.7293 8.09491 14.7515 8.09427 14.7737ZM9.05055 15.7255C8.93317 15.1558 8.88149 14.563 8.90353 13.9558C9.02269 10.6725 11.2611 7.96593 14.2555 7.10385C17.4384 9.29936 18.396 13.5882 16.4452 16.93C13.8985 17.9167 11.072 17.3978 9.05055 15.7255ZM15.1181 6.91081C17.7184 9.35397 18.615 13.1321 17.4102 16.4745C20.2705 14.8675 21.6743 11.6122 21.0339 8.51984C19.8194 7.51201 18.2747 6.88279 16.5756 6.82112C16.0785 6.80308 15.5911 6.83445 15.1181 6.91081ZM20.4052 6.70973C20.3957 6.69068 20.3861 6.67164 20.3764 6.65263C18.5176 3.0078 14.056 1.55994 10.4112 3.41875C9.83939 3.71037 9.32165 4.06603 8.86228 4.47256C10.5399 4.45102 12.2428 4.89944 13.766 5.86382C14.0399 6.03721 14.3012 6.22299 14.5496 6.41996C15.4463 6.15892 16.3993 6.03461 17.3837 6.07033C18.4511 6.10907 19.4682 6.33286 20.4052 6.70973ZM23.0676 8.37526C22.9899 7.19677 22.6767 6.01436 22.1061 4.89553C19.8559 0.48336 14.4551 -1.26931 10.0429 0.980835C8.27291 1.88351 6.93092 3.29322 6.10364 4.94275C4.22169 5.57604 2.53691 6.83539 1.392 8.64381C-1.25732 12.8285 -0.0126762 18.3685 4.172 21.0179C6.4341 22.45 9.09226 22.7443 11.4758 22.0513C12.9239 23.205 14.7408 23.922 16.7332 23.9943C21.6827 24.1739 25.8407 20.3071 26.0204 15.3575C26.1204 12.6012 24.9655 10.0903 23.0676 8.37526ZM22.8911 10.826C22.3488 13.3816 20.7 15.6794 18.1914 16.9587C17.7952 17.1607 17.3911 17.3305 16.982 17.469C16.8506 17.7296 16.7054 17.9862 16.546 18.2379C15.7743 19.4568 14.7574 20.4262 13.6001 21.1227C14.3581 21.4201 15.1784 21.5966 16.0382 21.6279C20.127 21.7762 23.5619 18.5819 23.7103 14.4932C23.7582 13.1731 23.4577 11.9212 22.8911 10.826ZM10.0347 20.6084C8.68069 20.6078 7.31064 20.2363 6.08202 19.4585C2.62511 17.2699 1.59693 12.6934 3.7855 9.23646C4.2004 8.58112 4.70111 8.01307 5.26375 7.53766C4.96834 9.35461 5.2278 11.2785 6.12821 13.044C6.6413 14.0501 7.31822 14.9179 8.10989 15.6315C8.23271 17.4996 8.93121 19.2198 10.0347 20.6084Z"
                fill="black"
              />
            </svg>
          </Avatar>
          {!cloeseChat && (
            <InputBase
              value={promt}
              onChange={handleChange}
              placeholder={"Wich language you want to improve?"}
              multiline
              variant="outlined"
              fullWidth
              margin="normal"
              maxRows={10}
              sx={{
                // border: "1px solid green",
                my: "8px",
              }} // Stellt sicher, dass der TextField besser sichtbar ist
            />
          )}

          <IconButton
            onClick={() => generateText(promt)}
            sx={{
              mb: "6px",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.0581 7.97508L9.99974 2.91675L4.94141 7.97508"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10 17.0834V3.05835"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </IconButton>
        </Box>
      </Box>
      <LearnLanguageComponent
        responseLangLearning={responseLangLearning}
        userData={userData}
      />

      {/* <WordsComponent words={updatedWords} /> */}
    </Grid>
  );
};

export default ELearningComponent;
