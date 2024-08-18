import { Box, Typography } from "@mui/material";
import { Theme } from "../../Theme";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveSub,
  setResearchProject,
} from "../../app/Slices/globalStates";
import { updateProject } from "../../app/Slices/createData";

const RenderContent = ({ chunks }) => {
  const navigate = useNavigate();
  const [toRenderProject, setToRenderProject] = useState();
  const { researchProject, activeSub, projects, prompt } = useSelector(
    (state) => state.globalStates
  );
  const dispatch = useDispatch();
  // Prüfen, ob 'chunks' ein Array ist
  const { id, subId } = useParams();
  console.log("projectId", id);
  const [hoveredItem, setHoveredItem] = useState();

  const toUpdateProject = projects.find((project) => project.id === id);
  console.log("toUpdateProject from render", projects);

  console.log("prompt from create project", prompt);
  const handleSeHovered = (id) => {
    setHoveredItem(id);
  };
  const handleResetHovered = () => {
    setHoveredItem(null);
  };

  const chunksWithIds = chunks.map((chunk) => ({
    ...chunk,
    id: uuidv4(), // UUID für den Chunk
    content: chunk.content.map((subContent) => ({
      ...subContent,
      id: uuidv4(), // UUID für jedes Subcontent
    })),
  }));

  // useEffect(() => {
  //   const currentProjects = JSON.parse(localStorage.getItem("projects")) || [];
  //   const projectIndex = currentProjects.findIndex((p) => p.id === projectId);

  //   if (projectIndex >= 0) {
  //     // Update existing project
  //     currentProjects[projectIndex] = {
  //       id: projectId,
  //       projectContent: chunksWithIds,
  //     };
  //   } else {
  //     // Add new project
  //     currentProjects.push({
  //       projectId: projectId,
  //       projectContent: chunksWithIds,
  //     });
  //   }

  //   localStorage.setItem("projects", JSON.stringify(currentProjects));
  // }, [projectId, chunksWithIds]);

  // useEffect(() => {
  //   if (chunksWithIds.length <= 0 && researchProject?.length > 0) {
  //     setToRenderProject(researchProject);
  //   } else {
  //     setToRenderProject(chunksWithIds);
  //   }
  // }, [chunksWithIds, researchProject]);

  if (!Array.isArray(chunks)) {
    return <Typography>Keine Daten verfügbar.</Typography>;
  }

  const openSub = (ud) => {
    dispatch(setActiveSub(ud));
    dispatch(
      updateProject({
        id: toUpdateProject.id,
        xid: toUpdateProject.xid,
        content: [...chunksWithIds],
        prompt: prompt,
      })
    );
    navigate(`/doc/${toUpdateProject.category}/${toUpdateProject.id}`);
    // dispatch(setResearchProject(chunksWithIds));
  };

  console.log("chunksWithIds", chunksWithIds);

  return (
    <Box
      sx={{
        // border: "1px solid red",
        pt: "16px",
        pb: "150px",
      }}
    >
      {!activeSub &&
        chunksWithIds.map((chunk, index) => (
          <Box key={index}>
            <Box
              sx={{
                mb: "12px",
                px: "16px",
                transition: "500ms",
                borderRadius: "4px",
                py: "8px",
                "&&:hover": {
                  background: "#FEFFFF",
                },
              }}
            >
              <Typography
                sx={{
                  ...Theme.fonts,
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
                        fontSize: "16px",
                        fontWeight: "400",
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
                          ...Theme.fonts,
                          fontSize: "12px",
                          fontWeight: "200",
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
                      onClick={() => openSub(data.id)}
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
        ))}
    </Box>
  );
};

export default RenderContent;
