import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import GoogleDocs from "../NewTextEditor/GoogleDocs";
import CustomTextEditorAdvenced from "../NewTextEditor/AdvencedEditor";
import TldrawComponent from "../NewTextEditor/NewTextEditor";
import Whiteboard from "../NewTextEditor/KonvaEditor";
import Collector from "../CodepenClone/Collector";
import DevDataRenderFromFirebase from "../DevDataRenderFromFirebase";
import { findUserDocument } from "../../../app/Slices/createData";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { UserAuth } from "../../../app/Auth";
import { db, model } from "../../../firebase";
import { Scrollbars } from "react-custom-scrollbars";
import { v4 as uuidv4 } from "uuid";
import { searchImagesByGoogle } from "../../Functions/GoogleImageSearch";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../../app/Slices/recievedData";
import DevDataRender from "../DevDataRender";
import GenerateAPI from "../GenerateAPI";
import { useLocation, useParams } from "react-router-dom";
import { Theme } from "../../../Theme";

const DatasetComponent = (props) => {
  const dispatch = useDispatch();

  const { user } = UserAuth();
  const [devData, setDevData] = useState(null);
  const [devDataFetched, setDevDataFetched] = useState(null);
  const [response, setResponse] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [updatedResponse, setUpdatedResponse] = useState([]);
  const dataToRender2 = useSelector((state) => state.recievedData);
  const [cloeseChat, setCloseChat] = useState(false);
  const [prompt, setPrompt] = useState("");
  const { id, category, subId, titleId } = useParams();
  const { uploaded } = useSelector((state) => state.globalStates);
  const location = useLocation();
  const [dataToRender, setDataToRender] = useState([]);
  console.log("dataToRender-", dataToRender);

  console.log("dataToRender-", dataToRender);
  console.log("dataToRender-devData", devData);
  console.log("dataToRender-devDataFetched", devDataFetched);

  useEffect(() => {
    setDataToRender(dataToRender2);
  }, [dataToRender2]);

  useEffect(() => {
    if (uploaded) {
      setDataToRender([]);
    }
  }, [uploaded]);
  const handleChange = (event) => {
    setPrompt(event.target.value);
  };

  const collections = devData
    ?.map((item) => item.collection) // Extrahiere alle collection Namen
    .filter((value, index, self) => self.indexOf(value) === index); // Entferne Duplikate

  const toggleChat = () => {
    setCloseChat((open) => !open);
  };
  console.log("collections", collections);
  //Put Images to Dev mode
  useEffect(() => {
    if (response.length > 0) {
      const fetchImages = async () => {
        const newResponse = await Promise.all(
          response.map(async (item) => {
            // const photos = await searchImages(item.promt);
            // const photos = await searchImagesByUnsplash(item.promt);
            console.log("item prompt", item.promt);
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
  useEffect(() => {
    dispatch(setData(updatedResponse));
  }, [updatedResponse, dispatch]);

  console.log("devData", devData);
  async function runDataset(prompt) {
    // Generate content stream with the provided prompt
    const result = await model.generateContentStream(
      `requirement 0: response directly the JSON object [{...generated keys}, {...generated keys}...],
      requirement 1: response using this JSON  Shema, and generate realistic data,
      requiremnt 2: create an key inside of obect caled promt, and put the 3 first values of first keys of object: promt : "value1, value2, value3"
      requiremnt 3: Create JUST This requirement, without suggestions, JUST JSON
      requiremnt 4: i need just clean JSON, so i can automate the next steps, no questions, no suggestions.
      requiremnt 4: detect the LANGUAGE wich one the user want to learn!
      }, ${prompt}`
    );
    // requiremnt 2: create an key inside of obect caled promt, generate promt so that ist short but clear to search this object is"

    let chunks = [];
    setPrompt("");

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();

      console.log("Received chunk: ", chunkText); // Logging the received chunk
      chunks.push(chunkText);
    }

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

      console.log("jsonObjects", jsonObjects);

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
        console.log("userDocSnap", userDocSnap);

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
            console.log("dataDev", dataDev);
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
  }, [user, location]);

  return (
    <Grid
      container
      style={{
        display: "flex",
        flexGrow: "1",
        position: "relative",

        background: location.pathname.includes("api") ? "#B5C6F1" : "#C5B5F1",
      }} // Sicherstellen, dass das Grid die volle Höhe und Breite einnimmt
    >
      <Box
        sx={{
          display: "flex",
          // border: "1px solid red",
          color: "black",
          pt: "40px",
          pb: "40px",
          position: "absolute",
          zIndex: "2000",
          left: "50%",
          top: "50px",
          background: "rgba(197, 181, 241, 0.2)",
          backdropFilter: "blur(15px)",
          px: "32px",
          gap: "24px",
          width: "90%",
          transform: "translate(-50%)",
          borderRadius: "16px",
        }}
      >
        {!location.pathname.includes("api") &&
          collections?.map((collection, index) => (
            <Typography
              key={index}
              sx={{
                ...Theme.fonts,
                fontSize: "24px",
                color: "#fff",
                cursor: "pointer",
                transition: "300ms",
                "&&:hover": {
                  color: "#614AA2",
                  transform: "scale(1.2)",
                },
              }}
            >
              {collection}
            </Typography>
          ))}
        {location.pathname.includes("api") && (
          <Box
            sx={{
              display: "flex",
              judtifyContent: "center",
            }}
          >
            <Typography
              sx={{
                ...Theme.fonts,
                fontSize: "32px",
                color: "#fff",
              }}
            >
              Get API's, use & share
            </Typography>
          </Box>
        )}
      </Box>
      <Scrollbars>
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            // border: "1px solid white",
            justifyContent: "center",
            pt: "180px",
            pb: "80px",
          }}
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
                  background: "#C5B5F1",
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
                onClick={() => runDataset(prompt)}
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

          {!location.pathname.includes("api") &&
            devData?.length > 0 &&
            dataToRender?.length <= 0 && (
              <DevDataRenderFromFirebase dataToRender={devData} />
            )}

          {!location.pathname.includes("api") &&
            devData?.length > 0 &&
            dataToRender?.length > 0 && (
              <DevDataRender dataToRender1={dataToRender} />
            )}

          {location.pathname.includes("api") && (
            <GenerateAPI devDataFetched={devDataFetched} />
          )}
          {/* {uploaded && <DevDataRenderFromFirebase dataToRender={devData} />} */}
        </Box>
      </Scrollbars>
    </Grid>
  );
};

export default DatasetComponent;
