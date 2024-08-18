import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

const Research = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        background: "#DDE9FF",
        mt: "50px",
        border: "1px solid red",
      }}
    >
      Research
    </Box>
  );
};

Research.propTypes = {};

export default Research;
