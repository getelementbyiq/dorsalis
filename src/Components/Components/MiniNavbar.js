import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { BootstrapTooltip } from "./Tooltip";
import { nav } from "./NavDB";

const MiniNavbar = ({ state }) => {
  const inputState = useSelector((state) => state.globalStates.input);

  return (
    <Box
      sx={{
        display: "flex",
        // border: "1px solid red",
        alignItems: "center",
        gap: "4px",
        width: "20%",
        px: "16px",
        margin: "0 auto",
        py: "2px",
        transition: "500ms",
        justifyContent: "center",
        position: "fixed",
        zIndex: "1500",
        left: "50%",
        transform: "translate(-50%)",
        bottom: inputState ? "70px" : "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "4px",
          alignItems: "center",
        }}
      >
        {nav[state].map((navItem, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              px: "8px",
              py: "4px",
              borderRadius: "32px",
              color: navItem.toolTip
                ? "rgba(225,225,225,1)"
                : "rgba(0,0,0,0.2)",
              cursor: "pointer",
              background: navItem.toolTip ? "#000" : "#fff",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.8vw",
              }}
            >
              {navItem.nav}
            </Typography>
          </Box>
        ))}
        <Box
          sx={{
            display: "flex",
            px: "8px",
            py: "4px",
            borderRadius: "32px",
            color: "rgba(0,0,0,0.5)",
            cursor: "pointer",
          }}
        >
          <Typography>...</Typography>
        </Box>
      </Box>
    </Box>
  );
};

MiniNavbar.propTypes = {};

export default MiniNavbar;
