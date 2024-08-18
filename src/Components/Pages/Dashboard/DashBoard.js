import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Grid,
  IconButton,
  InputBase,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Theme } from "../../../Theme";
import {
  runChat,
  runLanguageLearning,
  runLanguageLearningFunc,
  runSearchFunc,
} from "./../../Functions/Gemini";
import { searchImages } from "../../Functions/SearchPexels";
import { searchImagesByUnsplash } from "../../Functions/SearchShutterstock";
import { searchImagesByGoogle } from "../../Functions/GoogleImageSearch";
import { Masonry } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, setData } from "../../../app/Slices/recievedData";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../app/Auth";
import { findUserDocument, uploadData } from "../../../app/Slices/createData";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import LearnLanguageComponent from "../../Components/LearnLanguageComponent";
import { db, model } from "../../../firebase";
import { BootstrapTooltip } from "../../Components/Tooltip";
import Banner from "../../Components/Banner";
import Navbar from "../../Components/Navbar";
import {
  setInput,
  setInputDevAPI,
  setInputDevBackend,
  setInputDevDataset,
  setInputDevDB,
  setInputLearningMemo,
  setInputLearningTests,
  setInputLearningText,
  setInputLearningWords,
  setInputSearch,
  setMainNav,
} from "../../../app/Slices/globalStates";
import MiniNavbar from "../../Components/MiniNavbar";
import RightNavbar from "../../Components/RightNavbar";
import SearchComponent from "../../GoogleSearchComponent";
import WordsComponent from "../../Components/WordsComponent";
import { searchByGoogle } from "../../Functions/GoogleSearch";
import SearchResults from "../../Components/SearchDataRendering";
import WritingEffect from "../../Components/SearchDataAnswerRendering";
import { handleSearchGiphy } from "../../Functions/Giphy";
import Notes from "../../Components/Notes";
import LeftNavBar from "../../Components/LeftNavBar";
import StreamRenderer from "../../Components/StreamRenderer";
import ChunkRenderer from "../../Components/ChunkRenderer";
import NotesNew from "../../Components/NotesNew";
import DevDataRender from "../../Components/DevDataRender";
import DevDataRenderFromFirebase from "../../Components/DevDataRenderFromFirebase";
import GenerateAPI from "../../Components/GenerateAPI";
import CodeEditor from "../../Components/MonacoEditor";
import ReactPreview from "../../Components/ReactJsEditor";
import FullCompilor from "../../Components/OnlineEditor/FullCompiler";
import Collector from "../../Components/CodepenClone/Collector";
import MyComponent from "../../Components/ResizableComponent";
import { ResizableBox } from "react-resizable";

const Item = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "start",
  color: theme.palette.text.secondary,
  boxShadow: "0 15px 30px 0 rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  transition: "150ms",
  paddingBottom: "8px",
  "&&:hover": {
    background: "#EEEEEE",
  },
  position: "relative",
}));

const Dashboard = (props) => {
  const { user } = UserAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputState = useSelector((state) => state.globalStates.input);
  const [promt, setPromt] = useState("");
  const [lastPromt, setLastPromt] = useState("");
  const [response, setResponse] = useState([]);
  const [updatedResponse, setUpdatedResponse] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredCollapse, setHoveredCollapse] = useState(false);
  const [datasetName, setDatasetName] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [modeState, setModeState] = useState("search");
  const [modeStateDetection, setModeStateDetection] = useState("");
  const [responseSearch, setResponseSearch] = useState([]);
  const [responseLangLearning, setResponseLangLearning] = useState([]);
  const [userData, setUserData] = useState([]);
  const [words, setWords] = useState([]);
  const [updatedWords, setUpdatedWords] = useState([]);
  const [searchEngineData, setSearchEngineData] = useState([]);
  const [searchGoogleData, setSearchGoogleData] = useState([]);
  const [searchPrompts, setSearchPrompts] = useState([]);
  const [chunks, setChunks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //resizable components states--------------------------------------------------------
  const [leftNavWidth, setLeftNavWidth] = useState(20); // Initial width in percentage
  const [rightNavWidth, setRightNavWidth] = useState(20);
  //resizable components states--------------------------------------------------------

  const [rightNavState, setRightNavState] = useState("cross");

  const globalStates = useSelector((state) => state.globalStates);
  const globalStatesInput = useSelector(
    (state) => state.globalStates.globalInput
  );
  const { mainNav, subNav, dataset } = globalStates;
  const { search, dev, learning } = globalStatesInput;
  const { Search } = search;
  const { Dataset, API, DB, Backend } = dev;
  const { Words, Text, Memo, Tests } = learning;

  const values = {
    search: {
      Search,
    },
    dev: {
      Dataset,
      API,
      DB,
      Backend,
    },
    learning: {
      Words,
      Text,
      Memo,
      Tests,
    },
  };
  const value = values[mainNav]?.[subNav] || "";

  useEffect(() => {
    dispatch(setMainNav(modeState));
  }, [modeState, dispatch]);

  console.log("modeStateDetection", modeStateDetection);

  const dataToRender = useSelector((state) => state.recievedData);

  console.log("searchPrompts", searchPrompts);
  console.log("searchEngineDataCombined", searchEngineData);
  console.log("searchGoogleData", searchGoogleData);
  console.log("response", response);
  // console.log("hoveredCollapse", hoveredCollapse);
  // console.log("searchData", dataToRender);
  console.log("userData", userData);
  useEffect(() => {
    setPromt("");
  }, [mainNav, subNav]);

  useEffect(() => {
    const { mainNav, subNav } = globalStates;

    switch (mainNav) {
      case "search":
        if (subNav === "Search") {
          dispatch(setInputSearch(promt));
        }
        break;

      case "dev":
        switch (subNav) {
          case "Dataset":
            dispatch(setInputDevDataset(promt));
            break;
          case "API":
            dispatch(setInputDevAPI(promt));
            break;
          case "DB":
            dispatch(setInputDevDB(promt));
            break;
          case "Backend":
            dispatch(setInputDevBackend(promt));
            break;
          default:
            break;
        }
        break;

      case "learning":
        switch (subNav) {
          case "Words":
            dispatch(setInputLearningWords(promt));
            break;
          case "Text":
            dispatch(setInputLearningText(promt));
            break;
          case "Memo":
            dispatch(setInputLearningMemo(promt));
            break;
          case "Tests":
            dispatch(setInputLearningTests(promt));
            break;
          default:
            break;
        }
        break;

      default:
        break;
    }
  }, [
    globalStates.mainNav,
    globalStates.subNav,
    promt,
    dispatch,
    globalStates,
  ]);

  const mergedData = searchGoogleData?.reduce((acc, currentArray) => {
    // Extrahiere die gewünschten Eigenschaften
    const extractedData = currentArray.map((item) => ({
      title: item.title,
      snippet: item.snippet,
      link: item.link,
    }));

    // Füge die extrahierten Daten zum Akkumulator hinzu
    return acc.concat(extractedData);
  }, []);

  useEffect(() => {
    if (!inputState && promt) {
      dispatch(setInput(true));
    } else if (inputState && !promt) {
      dispatch(setInput(false));
    } else if (responseLangLearning.length > 0 && !promt) {
      dispatch(setInput(true));
    }
  }, [dispatch, promt, inputState]);

  useEffect(() => {
    dispatch(setData(updatedResponse));
  }, [updatedResponse, dispatch]);

  //Put Images to Dev mode
  useEffect(() => {
    if (response.length > 0) {
      const fetchImages = async () => {
        const newResponse = await Promise.all(
          response.map(async (item) => {
            // const photos = await searchImages(item.promt);
            // const photos = await searchImagesByUnsplash(item.promt);
            const photos = await searchImagesByGoogle(item.promt);
            console.log("photos for dev", photos);
            // console.log("photosShuterstock", photosShuterstock);
            const imageUrl = photos?.length > 0 ? photos[0]?.link : "";
            const itemData = { item: { ...item, imageUrl }, photos };
            setSearchData([...searchData, itemData]);
            return { ...item, imageUrl };
          })
        );
        setUpdatedResponse(newResponse);
      };

      fetchImages();
    }
  }, [response]);
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
  //Search google Data
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
  // const runChat = async (promt) => {
  //   await run(promt);
  // };
  const handleChange = (event) => {
    setPromt(event.target.value);
  };
  const handleChangeDataset = (event) => {
    setDatasetName(event.target.value);
  };
  useEffect(() => {
    if (searchGoogleData.length > 0) {
      runSearch(promt);
    }
  }, [searchGoogleData.length]);

  const generate = async (promt) => {
    // if (modeState === "search") {
    let result;
    let mode;

    // runWriteCodes(promt);
    // generateHTML(promt);

    // switch (globalStates.mainNav) {
    //   case "search":
    //     result = runNewSearch(promt);
    //     break;
    //   case "dev":
    //     // mode = modeDetection();
    //     result = runDataset(promt);
    //     break;
    //   case "learning":
    //     if (globalStates.subNav === "Words") {
    //       result = generateWords(promt);
    //     }
    //     if (globalStates.subNav === "Text") {
    //       result = runLanguageLearning(promt);
    //     }
    //     if (globalStates.subNav === "Memo") {
    //       // result = runLanguageLearning(promt);
    //     }
    //     if (globalStates.subNav === "Test") {
    //       // result = runLanguageLearning(promt);
    //     }
    //     break;
    //   default:
    //     result = null;
    //     break;
    // }
    // } else {
    // }
    //   result = runChat(promt);
    // modeDetection(promt); // to Use in Autopilot
    // generateWords(promt); //generation of words
    // languageDetection(promt); //detection of learning language, speaking language, proffesion
    // runLanguageLearning(promt); //crosswords

    // switch (modeState) {
    //   case "search":
    //     setResponseSearch(result);
    //     break;
    //   case "dev":
    //     // setResponse(result);
    //     break;
    //   case "learning":
    //     setWords(result);
    //     break;
    //   default:
    //     // Optionale Behandlung für unbekannte Werte von modeState
    //     break;
    // }
    // setResponseSearch(result);
  };

  const handleClickItem = (id) => {
    if (hoveredItem === id) {
      setHoveredItem(null);
    }
    setHoveredItem(id);
  };

  const handleModeState = (mode) => {
    setModeState(mode);
  };

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

  //-----------------------------------------Learning Fetch
  //-----------------------------------------Detecting the language Fetch
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
  //-----------------------------------------Detecting the language Fetch
  //------------------------------------------------------Mode Detection
  async function modeDetection(prompt) {
    // Generate content stream with the provided prompt
    console.error("this is infinity------------4");

    const result = await model.generateContentStream(
      `please look into promt, and let me know what the user whant? you dont have to generate or do something, you just have to detect what user asking for.
      generate some data? or generate some images, background-images or placeholder images?
      and for image generation is the runJustImage function responsible, and for data is the runDataset,
      and please response with JSON:{mode:value}
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
        console.log("response", jsonObjects);
        setModeStateDetection(jsonObjects?.mode);
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
  //-----------------------------------------Generate Words
  //-----------------------------------------Search Engine
  async function runSearch(promt) {
    // Generate content stream with the provided prompt
    const result = await model.generateContentStream(
      `requirement 0: requirement 1: generate content stream for prompt,
      }, ${promt}`
    );

    let chunksArray = [];

    // Process each chunk as it arrives
    for await (const chunk of result.stream) {
      const chunkText = await chunk.text();
      chunksArray.push(chunkText);
      setChunks([...chunksArray]);

      // Process and/or render the chunk as soon as it's received
      console.log("Received chunk: ", chunkText);
    }
    setIsLoading(false);
    //Just Commented
    // const completeResponse = chunks.join("").trim();
    // let resultObject;
    // try {
    //   // Cleaning the JSON response
    //   const cleanResponse = completeResponse
    //     .replace(/```json|```/g, "") // Remove markdown JSON delimiters
    //     .replace(/(\r\n|\n|\r)/gm, "") // Remove newlines
    //     .replace(/\s{2,}/g, " ") // Remove extra spaces
    //     .replace(/,(\s*])/, "]"); // Remove trailing commas

    //   // Try to parse the cleaned response
    //   try {
    //     resultObject = JSON.parse(cleanResponse); // Parse the cleaned response
    //     console.log("Parsed JSON: ", resultObject);
    //     // setSearchEngineData(resultObject);
    //     // Optionally add UUIDs to each object if needed
    //     // resultObject = resultObject.map((obj) => ({ ...obj, id: uuidv4() }));
    //     // console.log("Updated JSON objects with UUIDs: ", resultObject);
    //   } catch (parseError) {
    //     console.error(
    //       "Error parsing JSON response:",
    //       parseError,
    //       cleanResponse
    //     );
    //     return null; // Return null on JSON parsing error
    //   }
    // } catch (error) {
    //   console.error("Error generating content stream:", error);
    //   return null; // Return null on errors during content stream generation
    // }
    // setSearchEngineData(resultObject);
    //Just Commented

    // setSearchPrompts(resultObject.prompts);
    // return resultObject;
    // Optional: If you want to do something after all chunks have been processed
    // console.log("All chunks processed.");
  }
  // useEffect(() => {
  //   if (promt && mergedData.length > 0) {
  //     runSearch(mergedData, promt);
  //   }
  // }, [mergedData, promt]);
  //-----------------------------------------Search Engine

  //-----------------------------------------Search Engine
  async function runNewSearch(prompt) {
    // Generate content stream with the provided prompt
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
  //-----------------------------------------Search Engine
  async function runNewSearch2(prompt) {
    // Phase 1: Generiere Suchanfragen mit Gemini
    const searchPromptsResult = await model.generateContentStream(
      `requirement 1: generate short prompts to search google prompts:[shortPromt1,shortPromt2.... MAXIMUM-5]
        requirement 3: create JSON {prompts}
        requirement 4: RESPONSE JUST JSON OBJECT, wihtout any other Question or data
        }, ${prompt}`
    );

    let searchPromptsChunks = [];
    for await (const chunk of searchPromptsResult.stream) {
      const chunkText = await chunk.text();
      searchPromptsChunks.push(chunkText);
      console.log("Received chunk: ", chunkText);
    }

    const searchPromptsCompleteResponse = searchPromptsChunks.join("").trim();
    let searchPromptsObject;
    try {
      const cleanResponse = searchPromptsCompleteResponse
        .replace(/```json|```/g, "") // Remove markdown JSON delimiters
        .replace(/(\r\n|\n|\r)/gm, "") // Remove newlines
        .replace(/\s{2,}/g, " ") // Remove extra spaces
        .replace(/,(\s*])/, "]"); // Remove trailing commas

      searchPromptsObject = JSON.parse(cleanResponse); // Parse the cleaned response
      console.log("Parsed JSON: ", searchPromptsObject);
    } catch (error) {
      console.error("Error parsing JSON response:", error);
      return null; // Return null on JSON parsing error
    }

    const searchPrompts = searchPromptsObject.prompts;
    setSearchPrompts(searchPromptsObject.prompts);

    // Phase 2: Suche mit den generierten Suchanfragen bei Google
    const fetchSearchData = async () => {
      const newResponse = await Promise.all(
        searchPrompts.map(async (prompt) => {
          console.log("search-prompt", prompt);
          const searchData = await searchByGoogle(prompt);
          console.log("searchData---", searchData);
          return searchData;
        })
      );
      return newResponse;
    };

    const searchGoogleData = await fetchSearchData();
    console.log("searchGoogleData1", searchGoogleData);

    // Phase 3: Kombiniere die Google-Ergebnisse
    const mergedData = searchGoogleData.reduce((acc, currentArray) => {
      const extractedData = currentArray.map((item) => ({
        title: item.title,
        snippet: item.snippet,
        link: item.link,
      }));
      return acc.concat(extractedData);
    }, []);
    console.log("mergedData1", mergedData);

    // Phase 4: Sende die kombinierten Google-Ergebnisse erneut an Gemini
    const finalResult = await model.generateContentStream(
      `requirement 0: use from mergedData.object.snippet the Data to generate your answer:value,
       requirement 1: use 80% from your knowledge, and just 20% from snippets
        requirement 2 generate suggestions:[suggestion1,suggestion2....MAXIMUM-3]
        requirement 3: create JSON {answer, suggestions}
        requirement 4: RESPONSE JUST JSON OBJECT, wihtout any other Question or data
        }, ${(prompt, mergedData)}`
    );

    let finalChunks = [];
    for await (const chunk of finalResult.stream) {
      const chunkText = await chunk.text();
      finalChunks.push(chunkText);
      console.log("Received chunk: ", chunkText);
    }

    const finalCompleteResponse = finalChunks.join("").trim();
    let finalResultObject;
    try {
      const cleanResponse = finalCompleteResponse
        .replace(/```json|```/g, "") // Remove markdown JSON delimiters
        .replace(/(\r\n|\n|\r)/gm, "") // Remove newlines
        .replace(/\s{2,}/g, " ") // Remove extra spaces
        .replace(/,(\s*])/, "]"); // Remove trailing commas

      finalResultObject = JSON.parse(cleanResponse); // Parse the cleaned response
      console.log("Parsed JSON: ", finalResultObject);
    } catch (error) {
      console.error("Error parsing JSON response:", error);
      return null; // Return null on JSON parsing error
    }

    setSearchEngineData(finalResultObject);

    return finalResultObject;
  }
  //-----------------------------------------Run Dataset
  async function runDataset(prompt) {
    // Generate content stream with the provided prompt
    const result = await model.generateContentStream(
      `requirement 0: response directly the JSON object {{...generated keys, imageUrl:""}, {...generated keys, imageUrl:""}...},
      requirement 1: response using this JSON  Shema, and generate realistic data,
      requiremnt 2: create an key inside of obect caled promt, and put the 3 first values of first keys of object: promt : "value1, value2, value3"
      requiremnt 3: Create JUST This requirement, without suggestions, JUST JSON
      requiremnt 4: i need just clean JSON, so i can automate the next steps, no questions, no suggestions.
      requiremnt 4: detect the LANGUAGE wich one the user want to learn!
      }, ${prompt}`
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
        jsonObjects = JSON.parse(cleanResponse);
        console.log("Parsed JSON: ", jsonObjects);
        status = true;
        console.log("status", status);
      } catch (e) {
        console.error("Error parsing JSON response:", e, cleanResponse);
        return null;
      }
      jsonObjects = jsonObjects.map((obj) => ({ ...obj, id: uuidv4() }));
      setResponse(jsonObjects);
      return;
    } catch (e) {
      console.error(
        "Error parsing complete JSON response:",
        e,
        completeResponse
      );
    }

    return;
  }
  //-----------------------------------------Run Dataset
  //-----------------------------------------Run Just Image
  async function runJustImage(prompt) {
    // Generate content stream with the provided prompt
    const result = await model.generateContentStream(
      `requirement 0: response directly the JSON object {{promt, imageUrl:""}, {promt, imageUrl:""}...},
        requirement 1: response using this JSON  Shema, and generate realistic data,
        requiremnt 2: create for key promt:[promts related to request, for searching on google, maximum one sentence]
        requiremnt 4: i need just clean JSON, so i can automate the next steps, no questions, no suggestions.
        requiremnt 4: detect the LANGUAGE wich one the user want to learn!
        }, ${prompt}`
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
        jsonObjects = JSON.parse(cleanResponse);
        console.log("Parsed JSON: ", jsonObjects);
        status = true;
        console.log("status", status);
      } catch (e) {
        console.error("Error parsing JSON response:", e, cleanResponse);
        return null;
      }
      jsonObjects = jsonObjects.map((obj) => ({ ...obj, id: uuidv4() }));
      setResponse(jsonObjects);
      return;
    } catch (e) {
      console.error(
        "Error parsing complete JSON response:",
        e,
        completeResponse
      );
    }

    return;
  }
  //-----------------------------------------Run Just Image
  //-----------------------------------------Run Write Code
  async function runWriteCode(prompt) {
    // Generate content stream with the provided prompt
    const result = await model.generateContentStream(
      `requirement 0:
          }, ${prompt}`
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
        jsonObjects = JSON.parse(cleanResponse);
        console.log("Parsed JSON: ", jsonObjects);
        status = true;
        console.log("status", status);
      } catch (e) {
        console.error("Error parsing JSON response:", e, cleanResponse);
        return null;
      }
      jsonObjects = jsonObjects.map((obj) => ({ ...obj, id: uuidv4() }));
      return;
    } catch (e) {
      console.error(
        "Error parsing complete JSON response:",
        e,
        completeResponse
      );
    }

    return;
  }
  //-----------------------------------------Run Write Code
  async function runWriteCodes(prompt) {
    let htmlCode = "";
    let cssCode = "";

    // HTML-Generierung
    const htmlResult = await model.generateContentStream(
      prompt + " Generiere HTML-Struktur..."
    );

    for await (const chunk of htmlResult.stream) {
      htmlCode += chunk.text().trim();
    }

    // CSS-Generierung (unter Verwendung des generierten HTML)
    const cssResult = await model.generateContentStream(
      prompt + " Generiere CSS-Styles für den HTML-Code..." + htmlCode
    );

    for await (const chunk of cssResult.stream) {
      cssCode += chunk.text().trim();
    }

    // JavaScript-Generierung (unter Verwendung von HTML und CSS)
    const jsResult = await model.generateContentStream(
      prompt +
        " Generiere JavaScript-Code für dynamisches Verhalten..." +
        htmlCode +
        cssCode
    );

    for await (const chunk of jsResult.stream) {
      const jsCode = chunk.text().trim();
      // Sie können den generierten Code für HTML, CSS und JavaScript hier zurückgeben
      // oder an die aufrufende Funktion weiterleiten.
      console.log("HTML-Code:", htmlCode);
      console.log("CSS-Code:", cssCode);
      console.log("JavaScript-Code:", jsCode);

      // Rückgabebeispiel für die aufrufende Funktion
      return { html: htmlCode, css: cssCode, js: jsCode };
    }
  }
  // const [generatedHtml, setGeneretedHtml] = useState();
  // console.log("generatedHtml", generatedHtml);
  // async function generateHTML(prompt) {
  //   // Prompt wird um HTML-spezifische Anweisung erweitert
  //   let htmlCode = "";
  //   const htmlResult = await model.generateContentStream(
  //     prompt + " Generiere HTML-Struktur..."
  //   );

  //   for await (const chunk of htmlResult.stream) {
  //     htmlCode += chunk.text().trim();
  //   }
  //   // ... (Rest der HTML-Generierung wie in der vorherigen Antwort)
  //   setGeneretedHtml(htmlCode);
  //   return htmlCode;
  // }

  const [devDataFetched, setDevDataFetched] = useState(null);
  const [devData, setDevData] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchAndListenToDataset = async () => {
      try {
        // Finde das Benutzer-Dokument
        const userDocRef = await findUserDocument(user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          console.error("User document not found");
          return;
        }

        // Hole die Dataset-IDs aus dem Benutzer-Dokument
        const userData = userDocSnap.data();
        const datasets = userData.datasets || [];

        if (datasets.length === 0) {
          console.error("No dataset documents found for the user");
          return;
        }

        // Nehmen wir an, wir verwenden nur das erste Dataset-Dokument
        const datasetId = datasets[0];
        const datasetDocRef = doc(db, "datasets", datasetId);
        const subCollectionRef = collection(datasetDocRef, "sets");

        const unsubscribe = onSnapshot(
          subCollectionRef,
          (querySnapshot) => {
            const dataByCollection = {};
            const dataDev = [];

            querySnapshot.forEach((doc) => {
              const data = doc.data();
              const collectionName = data.collection; // Das Feld, das den Collection-Namen enthält
              dataDev.push({ id: doc.id, ...data });
              if (!dataByCollection[collectionName]) {
                dataByCollection[collectionName] = [];
              }

              dataByCollection[collectionName].push({ id: doc.id, ...data });
            });
            setDevData(dataDev);
            setDevDataFetched(dataByCollection);
          },
          (error) => {
            console.error("Error fetching data: ", error);
          }
        );

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching user document: ", error);
      }
    };

    fetchAndListenToDataset();
  }, [user]);

  console.log("devDataFetched", devDataFetched);

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        // border: "1px solid red",
        color: "white",
        background: Theme.dashboard.bg,
        // alignItems: "center",
        justifyContent: "flex-start",
        position: "relative",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          pr: "8px",
          pl: "8px",
          backgroundColor: "#fff",
          borderRadius: "32px",
          width: "40%",
          gap: "8px",
          position: "fixed",
          zIndex: "4001",
          bottom: "8px",
          right: "50%",
          transform: "translate(50%)",
          // border: "1px solid red",
        }}
      >
        <Avatar
          sx={{
            background: "transparent",
          }}
        >
          <svg
            width="18"
            height="35"
            viewBox="0 0 18 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14 0C11.7909 0 10 1.79086 10 4C10 6.20914 11.7909 8 14 8C16.2091 8 18 6.20914 18 4C18 1.79086 16.2091 0 14 0ZM4 6C4 4.89543 4.89543 4 6 4C7.10457 4 8 4.89543 8 6C8 7.10457 7.10457 8 6 8C4.89543 8 4 7.10457 4 6ZM0 17.5C0 12.8056 3.80558 9 8.5 9C13.1944 9 17 12.8056 17 17.5C17 22.1944 13.1944 26 8.5 26C3.80558 26 0 22.1944 0 17.5ZM0 31C0 28.7909 1.79086 27 4 27C6.20914 27 8 28.7909 8 31C8 33.2091 6.20914 35 4 35C1.79086 35 0 33.2091 0 31ZM12 28C10.8954 28 10 28.8954 10 30C10 31.1046 10.8954 32 12 32C13.1046 32 14 31.1046 14 30C14 28.8954 13.1046 28 12 28Z"
              fill="#373737"
            />
          </svg>
        </Avatar>
        <InputBase
          value={value}
          onChange={handleChange}
          placeholder={lastPromt ? lastPromt : "Enter your prompt"}
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

        <IconButton
          onClick={() => generate(promt)}
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

      {/* <Banner state={modeState} /> */}
      {/* <Navbar state={modeState} /> */}
      {/* <MiniNavbar state={modeState} /> */}
      {/* <Notes state={modeState} /> */}
      {/* <NotesNew state={mainNav} /> */}
      {/* <LeftNavBar
        state={mainNav}
        searchGoogleData={mergedData}
        devDataFetched={devDataFetched}
      /> */}
      {/* {globalStates.mainNav === "dev" && globalStates.subNav === "DB" && (
        // <CodeEditor />
        <ReactPreview />
      )} */}
      <Grid
        container
        sx={{
          display: "flex",
          flexGrow: "1",
          justifyContent: "space-between",
        }}
      >
        <Grid
          item
          xs={2}
          md={2}
          lg={2}
          sx={{
            display: "flex",
            width: "20%",
            // border: "1px solid red",
            pt: "60px",
          }}
        >
          <LeftNavBar
            state={mainNav}
            searchGoogleData={mergedData}
            devDataFetched={devDataFetched}
          />
        </Grid>
        <Grid
          item
          xs={8}
          md={8}
          lg={8}
          sx={{
            display: "flex",
            // justifyContent: "center",
            // border: "1px solid red",
            flexDirection: "column",
            // maxWidth: "0%",
            zIndex: "3000",
            flexGrow: "1",
          }}
        >
          <Box
            sx={{
              color: "#000",
              display: "flex",
              flexGrow: "1",
            }}
          >
            {/* Search State----------------------------------------------------------------------- */}
            {globalStates.mainNav === "search" &&
              globalStates.subNav === "Search" &&
              chunks.map((chunk, index) => (
                <ChunkRenderer key={index} chunk={chunk} />
              ))}
            {/* Search State----------------------------------------------------------------------- */}
            {/* Dev State----------------------------------------------------------------------- */}
            {globalStates.mainNav === "dev" &&
            globalStates.subNav === "Dataset" &&
            dataset?.length > 0 ? (
              <DevDataRenderFromFirebase dataToRender={devData} />
            ) : (
              <DevDataRender dataToRender={dataToRender} />
            )}
            {globalStates.mainNav === "dev" &&
              globalStates.subNav === "API" && (
                <GenerateAPI devDataFetched={devDataFetched} />
              )}
            {globalStates.mainNav === "dev" && globalStates.subNav === "DB" && (
              // <CodeEditor />
              // <ReactPreview />
              // <FullCompilor />
              <Collector />
            )}
            {globalStates.mainNav === "dev" &&
              globalStates.subNav === "Backend" && (
                <Typography>Backend</Typography>
              )}

            {/* Dev State----------------------------------------------------------------------- */}

            {/* Learning State----------------------------------------------------------------------- */}
            {globalStates.mainNav === "learning" &&
              globalStates.subNav === "Words" && (
                <WordsComponent words={updatedWords} />
              )}
            {globalStates.mainNav === "learning" &&
              globalStates.subNav === "Text" && (
                <LearnLanguageComponent
                  responseLangLearning={responseLangLearning}
                  userData={userData}
                />
              )}
            {globalStates.mainNav === "learning" &&
              globalStates.subNav === "Memo" && <Typography>Memo</Typography>}
            {globalStates.mainNav === "learning" &&
              globalStates.subNav === "Tests" && <Typography>Tests</Typography>}
            {/* Learning State----------------------------------------------------------------------- */}
          </Box>
        </Grid>
        <Grid
          item
          xs={2}
          md={2}
          lg={2}
          sx={{
            display: "flex",
            width: "20%",

            // border: "1px solid red",
            pt: "60px",
          }}
        >
          <NotesNew state={mainNav} />
        </Grid>
      </Grid>
    </Box>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
