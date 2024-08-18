import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  InputBase,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import GoogleDocs from "../NewTextEditor/GoogleDocs";
import CustomTextEditorAdvenced from "../NewTextEditor/AdvencedEditor";
import TldrawComponent from "../NewTextEditor/NewTextEditor";
import Whiteboard from "../NewTextEditor/KonvaEditor";
import { model } from "../../../firebase";
import { searchByGoogle } from "../../Functions/GoogleSearch";
import ChunkRenderer from "../ChunkRenderer";

import TextEditorSlate from "../NewTextEditor/SlateEditor";
import { ToolbaSlater } from "../NewTextEditor/ToolbarSlate";
import TextEditor from "../TextEditor";
import { createEditor } from "slate";
import { useSelected, withReact } from "slate-react";
import CkEditor from "../NewTextEditor/CkEditor";
import TextEditorWordType from "../NewTextEditor/WordTypeEditor";
import WordTypeEditor from "../NewTextEditor/WordTypeEditor";
import { PlusOne } from "@mui/icons-material";
import RenderContent from "../RenderContent";
import { Scrollbars } from "react-custom-scrollbars";
import { useDispatch, useSelector } from "react-redux";
import { Theme } from "../../../Theme";
import ResearchSideBar from "./ResearchSideBar";
import { useLocation, useParams } from "react-router-dom";
import { createProject } from "../../../app/Slices/createData";
import { UserAuth } from "../../../app/Auth";
import RenderfetchedProject from "./RenderfetchedProject";
import { setPromptRedux } from "../../../app/Slices/globalStates";
import RenderContentDoc from "../RenderContentDoc";
import RenderContentTitle from "../RenderContentTitle";

const Researcher = () => {
  const { user } = UserAuth();
  const dispatch = useDispatch();
  const { id, category, subId, titleId } = useParams();
  const location = useLocation();
  const editor = useMemo(() => withReact(createEditor()), []);
  const [chunks, setChunks] = useState([]);
  const [chunksSub, setChunksSub] = useState([]);
  const [searchPrompts, setSearchPrompts] = useState([]);
  const [searchGoogleData, setSearchGoogleData] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(false);
  const [cloeseChat, setCloseChat] = useState(false);

  console.log("id,titleId,subId ", id, titleId, subId);
  const { projects, activeSub } = useSelector((state) => state.globalStates);

  const toSearchProject = projects.find((project) => project.id === id);
  console.log("activeSub to search", activeSub);

  // update to local storage
  // useEffect(() => {
  //   if (user && id && category) {
  //     dispatch(
  //       createProject({
  //         docName: "projects",
  //         user: user,
  //         data: { id, category, name: `new-${category}` },
  //       })
  //     );
  //   }
  // }, [user, id, category, dispatch]);

  // useEffect(() => {
  //   const defaultName = `new-${category}`;
  //   const newProject = { defaultName, id, category };
  //   // Zuerst das existierende projectsArray aus dem localStorage abrufen
  //   const existingProjects = JSON.parse(localStorage.getItem("projects")) || [];

  //   // Überprüfen, ob das Projekt bereits existiert
  //   const projectExists = existingProjects.some(
  //     (project) => project.id === newProject.id
  //   );

  //   if (!projectExists) {
  //     // Wenn das Projekt nicht existiert, fügen wir es zum Array hinzu
  //     existingProjects.push(newProject);

  //     // Das aktualisierte Array von Projekten in einen JSON-String umwandeln
  //     const updatedProjectsString = JSON.stringify(existingProjects);

  //     // Den JSON-String im localStorage speichern
  //     localStorage.setItem("projects", updatedProjectsString);
  //   }
  // }, [id, category]);

  console.log("chunks", chunks);

  const toggleChat = () => {
    setCloseChat((open) => !open);
  };

  useEffect(() => {
    console.log("useEffect worked");
    if (searchPrompts.length > 0) {
      console.log("useEffect worked true");

      const fetchSearchData = async () => {
        console.log("useEffect worked fetch");

        const newResponse = await Promise.all(
          searchPrompts.map(async (prompt) => {
            console.log("search-prompt", prompt);

            // const photos = await searchImages(item.promt);
            // const photos = await searchImagesByUnsplash(item.promt);
            const searchData = await searchByGoogle(prompt);
            console.log("searchData---", searchData);
            return searchData;
          })
        );

        // Set the new search data
        setSearchGoogleData([...searchGoogleData, ...newResponse]);
      };

      fetchSearchData();
    }
  }, [searchPrompts]);

  useEffect(() => {
    if (searchGoogleData.length > 0) {
      runGemini(prompt);
    }
  }, [searchGoogleData.length]);

  async function runGoogleSearch(prompt) {
    // Generate content stream with the provided prompt
    setIsLoading(true);
    setLoadingMsg("Let see");
    const result = await model.generateContentStream(
      `requirement 1: generate short prompts to search google prompts:[shortPromt1,shortPromt2.... MAXIMUM-5]
        requirement 3: create JSON {prompts}
        requirement 4: RESPONSE JUST JSON OBJECT, wihtout any other Question or data
        }, ${prompt}`
    );

    let chunks = [];

    // Process each chunk as it arrives
    for await (const chunk of result.stream) {
      const chunkText = await chunk.text();
      chunks.push(chunkText);

      // Process and/or render the chunk as soon as it's received
      console.log("Received chunk: ", chunkText);
      setLoadingMsg("Answer converting");
    }

    const completeResponse = chunks.join("").trim();

    let resultObject;
    try {
      // Cleaning the JSON response
      const cleanResponse = completeResponse
        .replace(/```json|```/g, "") // Remove markdown JSON delimiters
        .replace(/(\r\n|\n|\r)/gm, "") // Remove newlines
        .replace(/\s{2,}/g, " ") // Remove extra spaces
        .replace(/,(\s*])/, "]"); // Remove trailing commas
      setLoadingMsg("Answer cleaning");

      // Try to parse the cleaned response
      try {
        resultObject = JSON.parse(cleanResponse); // Parse the cleaned response
        console.log("Parsed JSON: ", resultObject);
        // setSearchEngineData(resultObject);
        // Optionally add UUIDs to each object if needed
        // resultObject = resultObject.map((obj) => ({ ...obj, id: uuidv4() }));
        // console.log("Updated JSON objects with UUIDs: ", resultObject);
      } catch (parseError) {
        console.error(
          "Error parsing JSON response:",
          parseError,
          cleanResponse
        );
        return null; // Return null on JSON parsing error
      }
    } catch (error) {
      console.error("Error generating content stream:", error);
      return null; // Return null on errors during content stream generation
    }
    // setSearchEngineData(resultObject);
    setSearchPrompts(resultObject.prompts);

    // return resultObject;
    // Optional: If you want to do something after all chunks have been processed
    // console.log("All chunks processed.");
  }

  async function runGemini(promt) {
    dispatch(setPromptRedux(prompt));
    // Generate content stream with the provided prompt
    const result = await model.generateContentStream(
      `requirement 0: requirement 1: generate content stream for prompt,
      requirement 1: USE THIS JSON STRUCTURE [{title:value, content:[{subTitle:value, subContent:value},{subTitle:value, subContent:value}..]}, {title:value, content:[{subTitle:value, subContent:value},{subTitle:value, subContent:value}..]} ]
      requirement 1: Use this structure, if subtitle is related to the title put it into key content array:[...]
      requirement 2: set into value the content
      requirement 3: DO NOT CHANGE THE STRUCTURE
      requirement 3: DO NOT RENAME THE KEYS OF OBJECT : title, content, subtitle, subContent
      }, ${promt}`
    );

    let chunksArray = [];

    // Process each chunk as it arrives
    for await (const chunk of result.stream) {
      const chunkText = await chunk.text();
      chunksArray.push(chunkText);
      // setChunks([...chunksArray]);

      // Process and/or render the chunk as soon as it's received
      console.log("Received chunk: ", chunkText);
    }
    const completeResponse = chunksArray.join("").trim();
    const resultObject = JSON.parse(completeResponse);
    setChunks(resultObject);
    console.log("completeResponse", completeResponse);
    setIsLoading(false);
    setPrompt("");
  }

  async function runGeminiForSub(promt) {
    console.log("in render fetch passive");

    // Generate content stream with the provided prompt
    const result = await model.generateContentStream(
      ` requirement 0: generateExamples, recommendations of how this sub: ${activeSub?.subTitle} could be fleshed out with further subSub points and related values
      requirement 0: requirement 1: generate content stream for prompt: ${prompt}, look this title :${toSearchProject.title}, this is parent Title of the new Prompt,
      requirement 1: and for the child-subTitle:${activeSub?.subTitle} is the new promt:${prompt} 
      USE THIS JSON STRUCTURE {${activeSub?.subTitle}:
        [
          {subSubTitle:value}, 
          {subSubTitle:value},
          {subSubTitle:value},
          {subSubTitle:value}
      ..]
      requirement 1: Generate value realted to each subSubtitle, and put into value!!!
      requirement 1: all subSubTitles and values SHOULD be related to the new Promt:${prompt} and to the Parent Title:${toSearchProject.title} and the child-subTitle: ${activeSub?.subTitle},
      requirement 3: DO NOT CHANGE THE STRUCTURE
      requirement 3: DO NOT RENAME THE KEYS OF OBJECT : title, content, subtitle, subContent
      }, ${promt}`
    );

    let chunksArray = [];

    // Process each chunk as it arrives
    for await (const chunk of result.stream) {
      const chunkText = await chunk.text();
      chunksArray.push(chunkText);
      // setChunks([...chunksArray]);

      // Process and/or render the chunk as soon as it's received
      console.log("Received chunk: ", chunkText);
    }
    const completeResponse = chunksArray.join("").trim();
    const resultObject = JSON.parse(completeResponse);
    setChunksSub(resultObject);
    console.log("completeResponse from sub", resultObject);
    setIsLoading(false);
    setPrompt("");
  }
  const handleChange = (event) => {
    setPrompt(event.target.value);
  };

  const generate = async (prompt) => {
    // if (modeState === "search") {
    let result;
    result = runGoogleSearch(prompt);
    // if (!activeSub) {
    // } else {
    //   // result = runGeminiForSub(prompt);
    // }
  };

  console.log("chunksResult", chunks);
  const resultChunks = chunks;

  return (
    <Scrollbars>
      <Grid
        container
        style={{
          display: "flex",
          flexGrow: "1",
          position: "relative",

          // border: "1px solid green",
        }} // Sicherstellen, dass das Grid die volle Höhe und Breite einnimmt
      >
        {/* place for Toolbar */}
        {/* <ToolbaSlater editor={editor} /> */}
        {!subId ? (
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
              bottom: cloeseChat ? "-50px" : "8px",
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
                  background: "#000",
                  position: "relative",
                  transform: "translateY(-16px)",
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
                  value={prompt}
                  onChange={handleChange}
                  placeholder={"Enter your prompt"}
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
                onClick={() => generate(prompt)}
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
        ) : (
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
              bottom: cloeseChat ? "-50px" : "8px",
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
                  background: "#000",
                  position: "relative",
                  transform: "translateY(-16px)",
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
                  value={prompt}
                  onChange={handleChange}
                  placeholder={"Enter your prompt"}
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
                onClick={() => runGeminiForSub(prompt)}
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
        )}
        <Grid
          item
          sx={{
            display: "flex",
            width: "30%",
            flexDirection: "column",
            // border: "1px solid red",
            position: "fixed",
            left: "0",
            top: "50px",
          }}
        >
          <ResearchSideBar />
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            width: "40%",
            // border: "1px solid blue",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          {/* <Whiteboard /> */}
          {/* <TldrawComponent /> */}
          {/* <GoogleDocs /> */}
          {/* <TextEditorWordType /> */}
          {/* place for editor */}
          {/* <TextEditorSlate /> */}
          {/* <TextEditor editor={editor} /> */}
          {/* <CkEditor /> */}
          {resultChunks?.length > 0 && <RenderContent chunks={resultChunks} />}
          {subId && location.pathname.includes("subComp") && (
            <RenderfetchedProject chunksSub={chunksSub} />
          )}
          {id && location.pathname.includes("doc") && <RenderContentDoc />}
          {titleId && location.pathname.includes("mainComp") && (
            <RenderContentTitle />
          )}
          {/* {id && resultChunks?.length <= 0 && (
            <RenderContent chunks={toSearchProject?.content} />
          )} */}
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            width: "30%",
            position: "fixed",
            right: "0",
            top: "50px",
            // border: "1px solid red",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexGrow: "1",
              // border: "1px solid red",
              pt: "16px",
            }}
          >
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                cursor: "pointer",
                transition: "150ms",
                "&&:hover": {
                  background: "#E4ECFF",
                  transform: "translateX(4px) scale(1.2)",
                },
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.94501 2.69992L3.78751 9.21742C3.55501 9.46492 3.33001 9.95242 3.28501 10.2899L3.00751 12.7199C2.91001 13.5974 3.54001 14.1974 4.41001 14.0474L6.82501 13.6349C7.16251 13.5749 7.63501 13.3274 7.86751 13.0724L14.025 6.55492C15.09 5.42992 15.57 4.14742 13.9125 2.57992C12.2625 1.02742 11.01 1.57492 9.94501 2.69992Z"
                  stroke="#292D32"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.91748 3.7876C9.23998 5.8576 10.92 7.4401 13.005 7.6501"
                  stroke="#292D32"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.25 16.5H15.75"
                  stroke="#292D32"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Box> */}
            {/* {chunks.map((chunk, index) => (
            <ChunkRenderer key={index} chunk={chunk} />
          ))} */}
          </Box>
        </Grid>
      </Grid>
    </Scrollbars>
  );
};

export default Researcher;
