import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, InputBase, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Theme } from "../../../Theme";
import { model } from "../../../firebase";
import { v4 as uuidv4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Navigation } from "swiper/modules";
import {
  addSubSub,
  removeSub,
  updateProjectSub,
  updateSub,
} from "../../../app/Slices/createData";
import { setOpenChangeOn } from "../../../app/Slices/globalStates";

const RenderfetchedProject = ({ chunksSub }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, titleId, subId } = useParams();
  const [hoveredItem, setHoveredItem] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [newSubSub, setNewSubSub] = useState();
  const { activeSub, projects, openChangeOn } = useSelector(
    (state) => state.globalStates
  );
  const [newChunsSub, setNewChunSub] = useState([]);
  const [istChangeMode, setIsChangeMode] = useState(false);

  const [subTitle, setSubTitle] = useState();
  const [subTitleData, setSubTitleData] = useState();
  const [toRenderChunkSub, setToRenderChunkSub] = useState();

  //  useEffect(() => {

  console.log("hoveredItem", hoveredItem);
  console.log("chunksSub", chunksSub);
  useEffect(() => {
    // Berechne extractedArray nur innerhalb von useEffect
    const extractedArray = Object.values(chunksSub).flat();
    setToRenderChunkSub(extractedArray);
    console.log("extractedArray", extractedArray);
  }, [chunksSub]);

  const toRenderProject = projects?.find((project) => project.id === id);
  const handleSeHovered = (id) => {
    setHoveredItem(id);
  };

  const [dataSubSub, setDataSubSub] = useState([]);

  useEffect(() => {
    if (toRenderProject?.content) {
      const extractedData = toRenderProject.content.flatMap((chunk) =>
        chunk.content.map((data) => data.content)
      );
      setDataSubSub(extractedData);
    }
  }, [toRenderProject]);

  const handleResetHovered = () => {
    setHoveredItem(null);
  };

  console.log("chunksSub frrom rende", chunksSub);
  async function runGeminiForSub({ subSub, index }) {
    setNewChunSub([]);
    // Generate content stream with the provided prompt
    console.log("in render fetch aktive");
    const result = await model.generateContentStream(
      `requirement 0: this is the Json structure: parentPromt : ${toRenderProject.prompt} -> parentTitle :${toRenderProject.prompt}-> subTitle ${toRenderProject.title} -> subContent:${activeSub?.content} ->${index} : subSubTile:{${subSub.subSubTitle}->subSubTile:${subSub.subSubTitle}}
      requirement 0: requirement 1: generate alternative variations for ${subSub} maximum 3,
      requirement 1: and for the child-subTitle:${activeSub?.subTitle} is the new promt:${prompt} USE THIS JSON STRUCTURE [{variations:[{subSubTitle:value},{subSubTitle:value},{subSubTitle:value}]}
      requirement 1: Generate value realted to each subSubtitle, and put into value
      requirement 1: all subSubTitles and values SHOULD be related to the new Promt:${prompt} and to the Parent Title:${toRenderProject.title} and the child-subTitle: ${activeSub?.subTitle}, 
      requirement 3: DO NOT CHANGE THE STRUCTURE
      requirement 3: DO NOT RENAME THE KEYS OF OBJECT : title, content, subtitle, subContent
      }, ${subSub}`
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
    setNewSubSub(resultObject);
    console.log("variations from subSub", resultObject);
    setIsLoading(false);
  }

  const handleNewSubSub = ({ subSub, index }) => {
    runGeminiForSub({ subSub, index });
  };

  const handleUpdateSub = () => {
    dispatch(updateProjectSub);
  };

  const handleDelete = () => {
    dispatch(
      removeSub({
        id: id,
        xid: toRenderProject.xid,
        titleId: titleId,
        subTitleId: subId,
      })
    );
    navigate(`/doc/${toRenderProject.category}/${id}`);
  };
  const handleUpdateSubSub = () => {
    dispatch(
      updateSub({
        id: id,
        xid: toRenderProject.xid,
        titleId: titleId,
        subTitleId: subId,
        newSubTitle: subTitle,
        newSubContent: subTitleData,
      })
    );
    setIsChangeMode(false);
    dispatch(setOpenChangeOn(null));
  };
  const handleDeleteSub = () => {
    dispatch(
      removeSub({
        id: id,
        xid: toRenderProject.xid,
        titleId: titleId,
        subTitleId: subId,
      })
    );
    navigate(`/doc/${toRenderProject.category}/${id}`);
  };

  const handleUpdate = () => {
    dispatch(
      updateSub({
        id: id,
        xid: toRenderProject.xid,
        titleId: titleId,
        subTitleId: subId,
        newSubTitle: subTitle,
        newSubContent: subTitleData,
      })
    );
    setIsChangeMode(false);
    dispatch(setOpenChangeOn(null));
  };

  const [changeModeisOn, setChangeModeIsOn] = useState();

  const openChange = ({ id, subTitle, subContent }) => {
    setSubTitle(subTitle);
    setSubTitleData(subContent);
    setIsChangeMode(true);
    dispatch(setOpenChangeOn(id));
  };
  const openCloseChange = () => {
    setIsChangeMode(false);
    dispatch(setOpenChangeOn(null));
  };

  const handleChange = (event) => {
    setSubTitle(event.target.value);
  };
  const handleChangeSubtitle = (event) => {
    setSubTitleData(event.target.value);
  };

  const reMoveNewSub = (objectToRemove) => {
    // Entfernt das Objekt aus dem Array
    const updatedArray = toRenderChunkSub.filter(
      (item) => item !== objectToRemove
    );
    // Setzt den aktualisierten Zustand
    setToRenderChunkSub(updatedArray);
  };

  const uploadSubSub = (subsub) => {
    // Generiere eine neue UUID und setze sie als `id`
    const subToUP = { ...subsub, id: uuidv4() };

    dispatch(
      addSubSub({
        id: id,
        xid: toRenderProject.xid,
        subTitleId: subId,
        titleId: titleId,
        newSubSubObject: subToUP, // Übergibt das Objekt mit der neuen ID
      })
    );
    reMoveNewSub(subsub);
  };

  //   const toRenderNewSubSub = newSubSub[0]?.variations;
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        // border: "1px solid red",
        pt: "16px",
        pb: "150px",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {subId &&
        toRenderProject &&
        toRenderProject?.content?.map((chunk, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              //   border: "1px solid red",
            }}
          >
            {chunk.content &&
              chunk.content.map(
                (data) =>
                  data.id === subId && (
                    <Box
                      sx={{
                        display: "flex",
                        flexGrow: "1",
                        // border: "1px solid red",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        onMouseEnter={() => handleSeHovered(data.subTitle)}
                        onMouseLeave={handleResetHovered}
                        sx={{
                          display: "flex",
                          mb: "16px",
                          pt: "8px",
                          pr: "16px",
                          pl: "16px",
                          borderRadius: "8px",
                          transition: "500ms",
                          "&&:hover": {
                            background: "#FEFFFF",
                          },
                          position: "relative",
                          pb: "16px",
                          background: "#FEFFFF",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            flexGrow: "1",
                            gap: "4px",
                            width: "85%",
                          }}
                        >
                          {openChangeOn === data.id && istChangeMode ? (
                            <Box
                              sx={{
                                display: "flex",
                                backgroundColor: "#E4ECFF",
                                pl: "12px",
                                borderRadius: "4px",
                                flexGrow: "1",
                              }}
                            >
                              <InputBase
                                fullWidth
                                value={subTitle}
                                onChange={handleChange}
                                placeholder={data.subTitle}
                                size="small"
                              />
                            </Box>
                          ) : (
                            <Typography
                              sx={{
                                ...Theme.fontPrimary,
                                fontSize: "16px",
                                fontWeight: "600",
                              }}
                            >
                              {data.subTitle && data.subTitle}
                            </Typography>
                          )}
                          <Box
                            sx={{
                              pl: "24px",
                              display: "flex",
                              fliexDirection: "column",
                              gap: "4px",
                            }}
                          >
                            {openChangeOn === data.id && istChangeMode ? (
                              <Box
                                sx={{
                                  display: "flex",
                                  backgroundColor: "#E4ECFF",
                                  pl: "12px",
                                  borderRadius: "4px",
                                  flexGrow: "1",
                                }}
                              >
                                <InputBase
                                  fullWidth
                                  value={subTitleData}
                                  onChange={handleChangeSubtitle}
                                  placeholder={data.subContent}
                                  size="small"
                                  multiline
                                  rows={5}
                                  maxRows={8}
                                />
                              </Box>
                            ) : (
                              <Typography
                                sx={{
                                  ...Theme.fontPrimary,
                                  fontSize: "14px",
                                  fontWeight: "400",
                                }}
                              >
                                {data.subContent && data.subContent}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            // background: "red",
                            display: "flex",
                            flexDirection: "column",
                            flexGrow: "1",
                            gap: "8px",
                            alignItems: "flex-end",
                            justifyContent: "space-between",
                            transition: "150ms",
                            visibility:
                              hoveredItem === data.subTitle
                                ? "visible"
                                : "hidden",
                          }}
                        >
                          {openChangeOn === data.id && istChangeMode ? (
                            <Box>
                              <Box
                                onClick={openCloseChange}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  borderRadius: "50%",
                                  cursor: "pointer",
                                  transition: "150ms",
                                  width: "24px",
                                  height: "24px",

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
                                    d="M9 16.5C13.125 16.5 16.5 13.125 16.5 9C16.5 4.875 13.125 1.5 9 1.5C4.875 1.5 1.5 4.875 1.5 9C1.5 13.125 4.875 16.5 9 16.5Z"
                                    stroke="#292D32"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M6.87744 11.1224L11.1224 6.87744"
                                    stroke="#292D32"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M11.1224 11.1224L6.87744 6.87744"
                                    stroke="#292D32"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </Box>
                            </Box>
                          ) : (
                            <Box
                              onClick={() => handleDelete(data.id)}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "50%",
                                cursor: "pointer",
                                transition: "150ms",
                                width: "24px",
                                height: "24px",
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
                                  d="M15.75 4.48511C13.2525 4.23761 10.74 4.11011 8.235 4.11011C6.75 4.11011 5.265 4.18511 3.78 4.33511L2.25 4.48511"
                                  stroke="#292D32"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M6.375 3.7275L6.54 2.745C6.66 2.0325 6.75 1.5 8.0175 1.5H9.9825C11.25 1.5 11.3475 2.0625 11.46 2.7525L11.625 3.7275"
                                  stroke="#292D32"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M14.1373 6.85498L13.6498 14.4075C13.5673 15.585 13.4998 16.5 11.4073 16.5H6.5923C4.4998 16.5 4.4323 15.585 4.3498 14.4075L3.8623 6.85498"
                                  stroke="#292D32"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M7.74756 12.375H10.2451"
                                  stroke="#292D32"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M7.125 9.375H10.875"
                                  stroke="#292D32"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </Box>
                          )}

                          {openChangeOn === data.id && istChangeMode ? (
                            <Box
                              onClick={() =>
                                handleUpdate({
                                  subTitle: data.subTitle,
                                  subTitleData: data.subContent,
                                })
                              }
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
                                  d="M9 16.5C13.125 16.5 16.5 13.125 16.5 9C16.5 4.875 13.125 1.5 9 1.5C4.875 1.5 1.5 4.875 1.5 9C1.5 13.125 4.875 16.5 9 16.5Z"
                                  stroke="#292D32"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M5.8125 8.99994L7.935 11.1224L12.1875 6.87744"
                                  stroke="#292D32"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </Box>
                          ) : (
                            <Box
                              onClick={() =>
                                openChange({
                                  id: data.id,
                                  subTitle: data.subTitle,
                                  subContent: data.subContent,
                                })
                              }
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
                            </Box>
                          )}
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: "1",
                        }}
                      >
                        {data.content &&
                          data.content.map((subSub, index) => (
                            <Box
                              onMouseEnter={() =>
                                handleSeHovered(subSub.subSubTitle)
                              }
                              key={index}
                              sx={{
                                mb: "4px",
                                py: "8px",
                                display: "flex",
                                // border: "1px solid red",
                                px: "16px",
                                transition: "500ms",
                                "&&:hover": {
                                  background: "#FEFFFF",
                                },
                                position: "relative",
                                borderRadius: "8px",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  flexGrow: "1",
                                  gap: "4px",
                                  width: "85%",
                                }}
                              >
                                {openChangeOn === subSub.id && istChangeMode ? (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      backgroundColor: "#E4ECFF",
                                      pl: "12px",
                                      borderRadius: "4px",
                                      flexGrow: "1",
                                    }}
                                  >
                                    <InputBase
                                      fullWidth
                                      value={subTitle}
                                      onChange={handleChange}
                                      placeholder={subSub.subSubTitle}
                                      size="small"
                                    />
                                  </Box>
                                ) : (
                                  <Typography
                                    sx={{
                                      ...Theme.fontPrimary,
                                      fontSize: "14px",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {subSub.subSubTitle}
                                  </Typography>
                                )}
                                <Box
                                  sx={{
                                    // pl:
                                    //   openChangeOn !== subSub.id &&
                                    //   istChangeMode
                                    //     ? "32px"
                                    //     : "0px",
                                    pl: "24px",
                                    display: "flex",
                                    fliexDirection: "column",
                                    gap: "4px",
                                    position: "relative",
                                  }}
                                >
                                  {openChangeOn === subSub.id &&
                                  istChangeMode ? (
                                    <Box
                                      sx={{
                                        display: "flex",
                                        backgroundColor: "#E4ECFF",
                                        borderRadius: "4px",
                                        flexGrow: "1",
                                        bot: "8px",
                                      }}
                                    >
                                      <InputBase
                                        fullWidth
                                        value={subTitleData}
                                        onChange={handleChangeSubtitle}
                                        placeholder={data.subContent}
                                        size="small"
                                        multiline
                                        rows={5}
                                        maxRows={8}
                                        sx={{ pl: "24px" }}
                                      />
                                    </Box>
                                  ) : (
                                    <Typography
                                      sx={{
                                        ...Theme.fontPrimary,
                                        fontSize: "14px",
                                        fontWeight: "400",
                                        pl: "32px",
                                      }}
                                    >
                                      {subSub.value}
                                    </Typography>
                                  )}
                                </Box>
                              </Box>
                              <Box
                                sx={{
                                  // background: "red",
                                  display: "flex",
                                  flexDirection: "column",
                                  flexGrow: "1",
                                  gap: "8px",
                                  alignItems: "flex-end",
                                  justifyContent: "space-between",
                                  transition: "150ms",
                                  visibility:
                                    hoveredItem === subSub.subSubTitle
                                      ? "visible"
                                      : "hidden",
                                }}
                              >
                                {openChangeOn === subSub.id && istChangeMode ? (
                                  <Box>
                                    <Box
                                      onClick={openCloseChange}
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "50%",
                                        cursor: "pointer",
                                        transition: "150ms",
                                        width: "24px",
                                        height: "24px",

                                        "&&:hover": {
                                          background: "#E4ECFF",
                                          transform:
                                            "translateX(4px) scale(1.2)",
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
                                          d="M9 16.5C13.125 16.5 16.5 13.125 16.5 9C16.5 4.875 13.125 1.5 9 1.5C4.875 1.5 1.5 4.875 1.5 9C1.5 13.125 4.875 16.5 9 16.5Z"
                                          stroke="#292D32"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                        <path
                                          d="M6.87744 11.1224L11.1224 6.87744"
                                          stroke="#292D32"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                        <path
                                          d="M11.1224 11.1224L6.87744 6.87744"
                                          stroke="#292D32"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </svg>
                                    </Box>
                                  </Box>
                                ) : (
                                  <Box
                                    onClick={() => handleDeleteSub(subSub.id)}
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      borderRadius: "50%",
                                      cursor: "pointer",
                                      transition: "150ms",
                                      width: "24px",
                                      height: "24px",
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
                                        d="M15.75 4.48511C13.2525 4.23761 10.74 4.11011 8.235 4.11011C6.75 4.11011 5.265 4.18511 3.78 4.33511L2.25 4.48511"
                                        stroke="#292D32"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M6.375 3.7275L6.54 2.745C6.66 2.0325 6.75 1.5 8.0175 1.5H9.9825C11.25 1.5 11.3475 2.0625 11.46 2.7525L11.625 3.7275"
                                        stroke="#292D32"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M14.1373 6.85498L13.6498 14.4075C13.5673 15.585 13.4998 16.5 11.4073 16.5H6.5923C4.4998 16.5 4.4323 15.585 4.3498 14.4075L3.8623 6.85498"
                                        stroke="#292D32"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M7.74756 12.375H10.2451"
                                        stroke="#292D32"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M7.125 9.375H10.875"
                                        stroke="#292D32"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </svg>
                                  </Box>
                                )}

                                {openChangeOn === subSub.id && istChangeMode ? (
                                  <Box
                                    onClick={() =>
                                      handleUpdateSubSub({
                                        subTitle: subSub.subSubTitle,
                                        subTitleData: subSub.value,
                                      })
                                    }
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
                                        d="M9 16.5C13.125 16.5 16.5 13.125 16.5 9C16.5 4.875 13.125 1.5 9 1.5C4.875 1.5 1.5 4.875 1.5 9C1.5 13.125 4.875 16.5 9 16.5Z"
                                        stroke="#292D32"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                      <path
                                        d="M5.8125 8.99994L7.935 11.1224L12.1875 6.87744"
                                        stroke="#292D32"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </svg>
                                  </Box>
                                ) : (
                                  <Box
                                    onClick={() =>
                                      openChange({
                                        id: subSub.id,
                                        subTitle: subSub.subSubTitle,
                                        subContent: subSub.value,
                                      })
                                    }
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
                                  </Box>
                                )}
                              </Box>
                            </Box>
                          ))}
                      </Box>
                    </Box>
                  )
              )}
          </Box>
        ))}

      {/* New SubSubTitle Rendering here */}
      {toRenderChunkSub?.map((subSub, index) => (
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            // border: "1px solid red",
          }}
        >
          <Box
            onMouseEnter={() => handleSeHovered(subSub.subSubTitle)}
            onMouseLeave={handleResetHovered}
            key={index}
            sx={{
              display: "flex",
              mb: "2px",
              py: "8px",
              pr: "16px",
              pl: "16px",
              borderRadius: "8px",
              transition: "500ms",
              "&&:hover": {
                background: "#FEFFFF",
              },
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "95%",
              }}
            >
              <Typography
                sx={{
                  ...Theme.fonts,
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                {subSub.subSubTitle}
              </Typography>
              <Box
                sx={{
                  pl: "32px",
                }}
              >
                <Typography
                  sx={{
                    ...Theme.fonts,
                    fontSize: "12px",
                    fontWeight: "200",
                  }}
                >
                  {subSub.value}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: "1",
                gap: "8px",
                alignItems: "flex-end",
                justifyContent: "space-between",
                transition: "150ms",
                visibility:
                  hoveredItem === subSub.subSubTitle ? "visible" : "hidden",
              }}
            >
              <Box
                onClick={() => reMoveNewSub(subSub)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  cursor: "pointer",
                  transition: "150ms",
                  width: "24px",
                  height: "24px",
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
                    d="M15.75 4.48511C13.2525 4.23761 10.74 4.11011 8.235 4.11011C6.75 4.11011 5.265 4.18511 3.78 4.33511L2.25 4.48511"
                    stroke="#292D32"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.375 3.7275L6.54 2.745C6.66 2.0325 6.75 1.5 8.0175 1.5H9.9825C11.25 1.5 11.3475 2.0625 11.46 2.7525L11.625 3.7275"
                    stroke="#292D32"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.1373 6.85498L13.6498 14.4075C13.5673 15.585 13.4998 16.5 11.4073 16.5H6.5923C4.4998 16.5 4.4323 15.585 4.3498 14.4075L3.8623 6.85498"
                    stroke="#292D32"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.74756 12.375H10.2451"
                    stroke="#292D32"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.125 9.375H10.875"
                    stroke="#292D32"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Box>
              <Box
                onClick={() => uploadSubSub(subSub)}
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
                    d="M9 16.5C13.125 16.5 16.5 13.125 16.5 9C16.5 4.875 13.125 1.5 9 1.5C4.875 1.5 1.5 4.875 1.5 9C1.5 13.125 4.875 16.5 9 16.5Z"
                    stroke="#292D32"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.8125 8.99994L7.935 11.1224L12.1875 6.87744"
                    stroke="#292D32"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: "16px",
          right: "-320px",
          width: "250px",
          pb: "100px",
        }}
      >
        {toRenderNewSubSub?.map((subSub, index) => (
          <Box
            onMouseEnter={() => handleSeHovered(subSub.subSubTitle)}
            onMouseLeave={handleResetHovered}
            key={index}
            sx={{
              display: "flex",
              mb: "2px",
              py: "8px",
              pr: "16px",
              pl: "16px",
              borderRadius: "8px",
              transition: "500ms",
              "&&:hover": {
                background: "#FEFFFF",
              },
              position: "relative",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "95%",
              }}
            >
              <Typography
                sx={{
                  ...Theme.fonts,
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                {subSub.subSubTitle}
              </Typography>
              <Box
                sx={{
                  pl: "32px",
                }}
              >
                <Typography
                  sx={{
                    ...Theme.fonts,
                    fontSize: "12px",
                    fontWeight: "200",
                  }}
                >
                  {subSub.value}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: "1",
                gap: "8px",
                alignItems: "flex-end",
                justifyContent: "space-between",
                transition: "150ms",
                visibility:
                  hoveredItem === subSub.subSubTitle ? "visible" : "hidden",
              }}
            >
              <Box
                onClick={() => handleNewSubSub({ subSub, index })}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  cursor: "pointer",
                  transition: "150ms",
                  width: "24px",
                  height: "24px",
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
                    d="M11.1671 3.81005C10.5146 3.61505 9.79457 3.48755 8.99957 3.48755C5.40707 3.48755 2.49707 6.39755 2.49707 9.99005C2.49707 13.59 5.40707 16.5 8.99957 16.5C12.5921 16.5 15.5021 13.59 15.5021 9.99755C15.5021 8.66255 15.0971 7.41755 14.4071 6.38255"
                    stroke="#292D32"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.0972 3.99L9.92969 1.5"
                    stroke="#292D32"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.0978 3.98999L9.57031 5.83499"
                    stroke="#292D32"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Box>
              <Box
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
                    d="M10.8223 4.44751L15.3748 9.00001L10.8223 13.5525"
                    stroke="#292D32"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2.625 9H15.2475"
                    stroke="#292D32"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Box>
            </Box>
          </Box>
        ))}
      </Box> */}
    </Box>
  );
};

RenderfetchedProject.propTypes = {};

export default RenderfetchedProject;
