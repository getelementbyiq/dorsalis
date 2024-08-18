import { Box, Collapse, InputBase, Typography } from "@mui/material";
import { Theme } from "../../Theme";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveSub,
  setOpenChangeOn,
  setResearchProject,
} from "../../app/Slices/globalStates";
import {
  removeSub,
  updateProject,
  updateSub,
} from "../../app/Slices/createData";
import AddMoreSub from "./AddMoreSub";

const RenderContentDoc = (props) => {
  const navigate = useNavigate();
  const { researchProject, activeSub, projects, prompt, openChangeOn } =
    useSelector((state) => state.globalStates);
  const dispatch = useDispatch();
  // Prüfen, ob 'chunks' ein Array ist
  const { id, subId, category } = useParams();
  console.log("projectId", id);
  const [hoveredItem, setHoveredItem] = useState();

  const [subTitle, setSubTitle] = useState();
  const [istChangeMode, setIsChangeMode] = useState(false);
  const [subSubTitle, setSubSubTitle] = useState();
  const [subSubTitleContent, setSubSubTitleContent] = useState();

  const toRenderProject = projects?.find((project) => project.id === id);
  console.log("toUpdateProject from chunks", toRenderProject);

  console.log("prompt from create project", prompt);
  const handleSeHovered = (id) => {
    setHoveredItem(id);
  };
  const handleResetHovered = () => {
    setHoveredItem(null);
  };

  const openMainComp = (titleId) => {
    navigate(`/mainComp/${category}/${id}/${titleId}`);
  };
  // if (!Array.isArray(chunks)) {
  //   return <Typography>Keine Daten verfügbar.</Typography>;
  // }

  // const openSub = (ud) => {
  //   navigate(`/dashboard/${toUpdateProject.category}/${toUpdateProject.id}`);
  //   // dispatch(setResearchProject(chunksWithIds));
  // };
  const handleChangeSubtitle = (event) => {
    setSubSubTitle(event.target.value);
  };
  const handleChangeSubtitleContetn = (event) => {
    setSubSubTitleContent(event.target.value);
  };
  const openCloseChange = () => {
    setIsChangeMode(false);
    dispatch(setOpenChangeOn(null));
  };
  const openChange = ({ id, subTitle, subContent }) => {
    // setSubTitle(subTitle);
    // setSubTitleData(subContent);
    // setIsChangeMode(true);
    // dispatch(setOpenChangeOn(id));
  };

  const handleUpdateSubSub = () => {
    // dispatch(
    //   updateSub({
    //     id: id,
    //     xid: toRenderProject.xid,
    //     titleId: titleId,
    //     subTitleId: subId,
    //     newSubTitle: subTitle,
    //     newSubContent: subTitleData,
    //   })
    // );
    setIsChangeMode(false);
    dispatch(setOpenChangeOn(null));
  };
  const handleDeleteSub = () => {
    // dispatch(
    //   removeSub({
    //     id: id,
    //     xid: toRenderProject.xid,
    //     titleId: titleId,
    //     subTitleId: subId,
    //   })
    // );
    navigate(`/doc/${toRenderProject.category}/${id}`);
  };
  const [isShow, setIsShow] = useState(false);
  const showMore = (title) => {
    if (title === isShow) {
      setIsShow(false);
    } else {
      setIsShow(title);
    }
  };

  return (
    <Box
      sx={{
        // border: "1px solid red",
        pt: "16px",
        pb: "150px",
      }}
    >
      {toRenderProject &&
        toRenderProject.content &&
        toRenderProject?.content.map((chunk, index) => (
          <Box key={index}>
            <Box
              onClick={() => openMainComp(chunk.id)}
              sx={{
                mb: "12px",
                px: "16px",
                transition: "500ms",
                borderRadius: "4px",
                py: "8px",
                "&&:hover": {
                  background: "#FEFFFF",
                },
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{
                  ...Theme.fontPrimary,
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                {chunk.title.replace(/_/g, " ")}
              </Typography>
            </Box>
            {chunk.content &&
              chunk.content.map((data) => (
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
                    onClick={() => showMore(data.subTitle)}
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
                      background: isShow === data.subTitle ? "#FEFFFF" : "none",
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
                          ...Theme.fontPrimary,
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        {data.subTitle && data.subTitle}
                      </Typography>
                      <Box
                        sx={{
                          pl: "32px",
                        }}
                      >
                        <Typography
                          sx={{
                            ...Theme.fontPrimary,
                            fontSize: "14px",
                            fontWeight: "400",
                          }}
                        >
                          {data.subContent && data.subContent}
                        </Typography>
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
                          hoveredItem === data.subTitle ? "visible" : "hidden",
                      }}
                    >
                      <Box
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
                        // onClick={() => openSub(data.id)}
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
                    <Box
                      sx={{
                        height: "32px",
                        display: "flex",
                        background: "rgba(225,225,225,0.01)",
                        position: "absolute",
                        bottom: "-16px",
                        zIndex: "2000",
                        width: "32px",
                        left: "50%",
                        transform: "translate(-50%)",
                        borderRadius: "50%",
                        "&&:hover": {
                          background: "#9CBBFF",
                        },
                        cursor: "pointer",
                        visibility:
                          hoveredItem === data.subTitle ? "visible" : "hidden",
                        alignItems: "center",
                        justifyContent: "center",
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
                          d="M4.5 9H13.5"
                          stroke="#292D32"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9 13.5V4.5"
                          stroke="#292D32"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </Box>
                    <Box
                      sx={{
                        height: "32px",
                        display: "flex",
                        position: "absolute",
                        bottom: "8px",
                        zIndex: "2000",
                        width: "32px",
                        left: "16px",
                        transform: "translate(-50%)",
                        cursor: "pointer",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          ...Theme.fontPrimery,
                          fontSize: "14px",
                          fontWeigt: "400",
                        }}
                      >
                        {data?.content?.length}
                      </Typography>
                    </Box>
                  </Box>
                  <Collapse
                    in={isShow === data.subTitle}
                    sx={{
                      transition: "150ms",
                      my: isShow === data.subTitle ? "16px" : "0px",
                      borderRadius: "16px",
                      background: "#C9DCFF",
                    }}
                  >
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
                                    value={subSubTitle}
                                    onChange={handleChangeSubtitle}
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
                                {openChangeOn === subSub.id && istChangeMode ? (
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
                                      value={subSubTitleContent}
                                      onChange={handleChangeSubtitleContetn}
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
                  </Collapse>
                </Box>
              ))}
            {/* <Typography>{value}</Typography> */}
          </Box>
        ))}
    </Box>
  );
};

export default RenderContentDoc;
