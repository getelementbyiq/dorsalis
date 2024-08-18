import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { Theme } from "../../../Theme";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setActiveSub } from "../../../app/Slices/globalStates";

const ResearchSideBar = () => {
  const navigate = useNavigate();
  const { category, id, subId, titleId } = useParams();
  const dispatch = useDispatch();
  const { projects, activeSub } = useSelector((state) => state.globalStates);
  const toRenderProject = projects?.find((project) => project.id === id) || {};

  console.log("toRenderProjectSideBar", toRenderProject);
  console.log("activeSub", activeSub);
  console.log("activeSubId", subId);
  console.log("toRenderProject", toRenderProject?.content);
  const openDoc = () => {
    navigate(`/doc/${toRenderProject.category}/${toRenderProject.id}`);
  };

  const openMainComp = (titleId) => {
    navigate(`/mainComp/${category}/${id}/${titleId}`);
  };

  const handleActiveSub = ({ data, titleId }) => {
    dispatch(setActiveSub(data));
    navigate(
      `/subComp/${toRenderProject.category}/${toRenderProject.id}/${titleId}/${data.id}`
    );
  };

  if (!toRenderProject) return <Typography>No Data</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        pb: "150px",
        flexDirection: "column",
        top: "16px",
        left: "8px",
        width: "60%",
        position: "absolute",
      }}
    >
      <Box
        onClick={openDoc}
        sx={{
          display: "flex",
          mb: "8px",
          px: "16px",
          transition: "500ms",
          borderRadius: "4px",
          py: "8px",
          "&&:hover": {
            background: "#FEFFFF",
          },
          alignItems: "center",
          gap: "16px",
          cursor: "pointer",
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
            d="M6.765 2.13012L2.7225 5.28012C2.0475 5.80512 1.5 6.92262 1.5 7.77012V13.3276C1.5 15.0676 2.9175 16.4926 4.6575 16.4926H13.3425C15.0825 16.4926 16.5 15.0676 16.5 13.3351V7.87512C16.5 6.96762 15.8925 5.80512 15.15 5.28762L10.515 2.04012C9.465 1.30512 7.7775 1.34262 6.765 2.13012Z"
            stroke="#292D32"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9 13.4924V11.2424"
            stroke="#292D32"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <Typography
          sx={{
            ...Theme.fonts,
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          Doc
        </Typography>
      </Box>
      {toRenderProject &&
        toRenderProject?.content?.map((chunk, index) => (
          <Box key={index}>
            <Box
              onClick={() => openMainComp(chunk.id)}
              sx={{
                mb: "8px",
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
                  ...Theme.fonts,
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {chunk?.title && chunk?.title.replace(/_/g, " ")}
              </Typography>
            </Box>
            {chunk?.content &&
              chunk?.content.map((data) => (
                <Box
                  onClick={() =>
                    handleActiveSub({ data: data, titleId: chunk.id })
                  }
                  sx={{
                    display: "flex",
                    mb: "2px",
                    py: "8px",
                    pr: "16px",
                    pl: "16px",
                    borderRadius: "8px",
                    transition: "500ms",
                    cursor: "pointer",
                    "&&:hover": {
                      background: "#FEFFFF",
                    },
                    position: "relative",
                    background: subId === data.id ? "#FEFFFF" : "none",
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
                        fontSize: "12px",
                        fontWeight: "400",
                      }}
                    >
                      {data.subTitle}{" "}
                      {data.subTitle === "Case Studies" && "test"}
                    </Typography>

                    {/* <Box
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
                      {data.subContent}
                      </Typography>
                      </Box> */}
                  </Box>
                </Box>
              ))}
            {/* <Typography>{value}</Typography> */}
          </Box>
        ))}
    </Box>
  );
};

ResearchSideBar.propTypes = {};

export default ResearchSideBar;

{
  /* <Box>
  {data?.content && data.content.length > 0 && (
    <Box>
      {data.content.map((subsub, index) => (
        <Typography key={index}>
          {subsub.subSubTitle || "No Title Provided"}
        </Typography>
      ))}
    </Box>
  )}
</Box> */
}
