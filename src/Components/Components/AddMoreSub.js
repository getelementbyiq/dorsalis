import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

const AddMoreSub = ({ data }) => {
  const { subId } = useParams();
  const [isHovere, setIsHovered] = useState();
  const handleSeHovered = (id) => {
    setIsHovered(id);
  };
  const handleResetHovered = () => {
    setIsHovered(null);
  };
  return (
    <Box
      sx={{
        height: "32px",
        display: "plex",
        background: "rgba(225,225,225,0.01)",
        position: "absolute",
        bottom: "-16px",
        zIndex: "2000",
        width: "32px",
        left: "50%",
        transform: "translate(-50%)",
        visibility: "hidden",
        borderRadius: "50%",
        "&&:hover": {
          background: "#CFDEFF",
          visibility: "visible",
        },
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
  );
};

AddMoreSub.propTypes = {};

export default AddMoreSub;
