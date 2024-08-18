import React from "react";
import PropTypes from "prop-types";
import { Box, InputBase, Typography } from "@mui/material";
import { BootstrapTooltip } from "./Tooltip";
import { nav } from "./NavDB";
import { useSelector } from "react-redux";

const Navbar = ({ state }) => {
  const inputState = useSelector((state) => state.globalStates.input);
  return (
    <Box
      sx={{
        display: "flex",
        // border: "1px solid red",
        alignItems: "center",
        gap: "4px",
        width: "50%",
        px: "16px",
        margin: "0 auto",
        py: inputState ? "2px" : "8px",
        transition: "800ms",
        justifyContent: "space-between",
        mt: inputState ? "-100px" : "210px",
        position: "absolute",
        zIndex: "3000",
        left: "50%",
        transform: "translate(-50%)",
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
              color: navItem.toolTip ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.2)",
              cursor: "pointer",
              //   border: "1px solid red",
            }}
          >
            <BootstrapTooltip
              title={navItem.toolTip ? "Try it" : "Comming soon"}
            >
              <Typography>{navItem.nav}</Typography>
            </BootstrapTooltip>
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
          <BootstrapTooltip title="Your wishes">
            <Typography>...</Typography>
          </BootstrapTooltip>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          px: inputState ? "8px" : "24px",
          py: inputState ? "2px" : "8px",
          borderRadius: "32px",
          color: "#000",
          width: "30%",
          // border: "1px solid red",
          background: "#fff",
          alignItems: "center",
        }}
      >
        <InputBase fullWidth placeholder="What you would learn at next?" />
      </Box>
    </Box>
  );
};

Navbar.propTypes = {};

export default Navbar;
