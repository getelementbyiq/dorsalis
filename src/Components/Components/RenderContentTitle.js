import { Box, InputBase, Typography } from "@mui/material";
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
import { updateProject, updateTitle } from "../../app/Slices/createData";

const RenderContentTitle = (props) => {
  const navigate = useNavigate();
  const { researchProject, activeSub, projects, prompt, openChangeOn } =
    useSelector((state) => state.globalStates);
  const dispatch = useDispatch();
  // Prüfen, ob 'chunks' ein Array ist
  const { category, id, subId, titleId } = useParams();
  console.log("projectId", id);
  const [hoveredItem, setHoveredItem] = useState();

  const toRenderProject = projects?.find((project) => project.id === id);
  console.log("toUpdateProject from chunks", toRenderProject);
  const [title, setTitle] = useState();
  const [istChangeMode, setIsChangeMode] = useState(false);

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
  const openSubComp = (subId) => {
    navigate(`/subComp/${category}/${id}/${titleId}/${subId}`);
  };

  // if (!Array.isArray(chunks)) {
  //   return <Typography>Keine Daten verfügbar.</Typography>;
  // }

  // const openSub = (ud) => {
  //   navigate(`/dashboard/${toUpdateProject.category}/${toUpdateProject.id}`);
  //   // dispatch(setResearchProject(chunksWithIds));
  // };
  const handleUpdate = () => {
    dispatch(
      updateTitle({
        id: id,
        xid: toRenderProject.xid,
        titleId: titleId,
        newTitle: title,
      })
    );
    setIsChangeMode(false);
    dispatch(setOpenChangeOn(null));
  };

  const openChange = ({ id, title }) => {
    setTitle(title);
    setIsChangeMode(true);
    dispatch(setOpenChangeOn(id));
  };
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        // border: "1px solid red",
        pt: "16px",
        pb: "150px",
      }}
    >
      {toRenderProject?.content.map(
        (chunk, index) =>
          chunk.id === titleId && (
            <Box
              key={index}
              sx={{
                display: "flex",
                // border: "1px solid red",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <Box
                onMouseEnter={() => handleSeHovered(chunk.title)}
                onMouseLeave={handleResetHovered}
                onClick={() => openMainComp(chunk.id)}
                sx={{
                  display: "flex",
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "95%",
                  }}
                >
                  {openChangeOn === chunk.id && istChangeMode ? (
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
                        value={title}
                        onChange={handleChangeTitle}
                        placeholder={chunk.title}
                        size="small"
                      />
                    </Box>
                  ) : (
                    <Typography
                      sx={{
                        ...Theme.fontPrimary,
                        fontSize: "18px",
                        fontWeight: "600",
                      }}
                    >
                      {chunk.title.replace(/_/g, " ")}
                    </Typography>
                  )}
                </Box>
                <Box
                  sx={{
                    // background: "red",
                    display: "flex",
                    // flexDirection: "column",
                    flexGrow: "1",
                    gap: "8px",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    transition: "150ms",
                    visibility:
                      hoveredItem === chunk.title ? "visible" : "hidden",
                  }}
                >
                  {openChangeOn === chunk.id && istChangeMode ? (
                    <Box
                      onClick={() =>
                        handleUpdate({
                          title: chunk.title,
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
                          id: chunk.id,
                          title: chunk.title,
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
              {chunk.content &&
                chunk.content.map((data) => (
                  <Box
                    onClick={() => openSubComp(data.id)}
                    onMouseEnter={() => handleSeHovered(data.subTitle)}
                    onMouseLeave={handleResetHovered}
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
                      cursor: "pointer",
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
                  </Box>
                ))}
              {/* <Typography>{value}</Typography> */}
            </Box>
          )
      )}
    </Box>
  );
};

export default RenderContentTitle;
