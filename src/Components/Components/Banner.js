import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import LBG from "../../assets/images/openart-image_l7sBShUT_1722441267778_raw.png";
import DBG from "../../assets/images/devmode.png";
import SBG from "../../assets/images/searchmode.png";
import { useSelector } from "react-redux";

const Banner = ({ state }) => {
  const inputState = useSelector((state) => state.globalStates.input);
  console.log("inputState", inputState);
  return (
    <Box
      sx={{
        display: "flex",
        height: "200px",
        //   border: "1px solid red",
        margin: "0 auto",
        width: "50%",
        borderRadius: "32px",
        overflow: "hidden",
        position: "absolute",
        transition: "600ms",
        top: inputState ? "-300px" : "4px",
        left: "50%",
        transform: "translate(-50%)",
        zIndex: "1000",
      }}
    >
      <img
        src={state === "search" ? SBG : state === "dev" ? DBG : LBG}
        alt=""
        style={{
          width: "100%",
          objectFit: "cover",
          postiion: "relative",
        }}
      />
    </Box>
  );
};

Banner.propTypes = {};

export default Banner;
