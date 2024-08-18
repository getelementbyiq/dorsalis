import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import CBG from "../../assets/images/Firefly generate colorfull Crossword puzzle 9985.jpg";
import MBG from "../../assets/images/Firefly generate colorfull memo card game, on two of them images of animals 9985.jpg";
import { rightNav } from "./NavDB";
import { BootstrapTooltip } from "./Tooltip";
import Rightbar from "./Rightbar";
import { UserAuth } from "../../app/Auth";
import TextEditor from "./TextEditor";

const Notes = ({ state }) => {
  const { user } = UserAuth();
  const [rightNavState, setRightNavState] = useState("Crosswords");
  const handleRightNav = (txt) => {
    setRightNavState(txt);
  };
  return (
    <Box
      sx={{
        display: "flex",
        // border: "1px solid red",
        position: "fixed",
        right: "8px",
        // flexDirection: "column",
        // alignItems: "flex-end",
        py: "4px",
        top: "64px",
        gap: "4px",
        background: "rgba(0,0,0,0.08)",
        height: "85vh",
        width: "15%",
        borderRadius: "16px",
        flexDirection: "column",
        color: "#000",
      }}
    >
      <Typography
        sx={{
          fontSize: "12px",
          textAlign: "center",
        }}
      >
        Notes
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Divider sx={{ width: "80%", solor: "blue" }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          px: "16px",
          mx: "4px",
          background: "#fff",
        }}
      >
        <InputBase fullWidth placeholder="Create Note" />
      </Box>
      <TextEditor />
      <Box
        sx={{
          color: "#000",
          display: "flex",
          // border: "1px solid red",
          // background: "grey",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          flexGrow: "1",
        }}
      ></Box>
    </Box>
  );
};

Notes.propTypes = {};

export default Notes;
