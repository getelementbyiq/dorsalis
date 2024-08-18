import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { Theme } from "../../Theme";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import Position from "./NewTextEditor/NewTextEditor";
import Workspace from "./NewTextEditor/NewTextEditor";
import Researcher from "./Functions/Researcher";
import Developer from "./Functions/Frontend";
import FrontendComponent from "./Functions/Frontend";
import DatasetComponent from "./Functions/Dataset";
import APIComponent from "./Functions/API";
import BackendComponent from "./Functions/Backend";
import WordsComponent from "./Functions/Words";
import TextComponent from "./Functions/Text";
import MemoComponent from "./Functions/Memo";
import TestsComponent from "./Functions/Tests";
import ELearningComponent from "./Functions/Words";
import GenerateAPI from "./GenerateAPI";

const ResearchComponent = (props) => {
  const { mainNav } = useSelector((state) => state.globalStates);
  const location = useLocation();
  const { category, id } = useParams();
  const path = location.pathname;
  console.log("category", category);
  console.log("id", id);

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        mt: "50px",
        overflow: "hidden",
        // border: "1px solid red",
        // background: "#DDE9FF",
      }}
    >
      {category === "research" && (
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            background: "#DDE9FF",
            overflowY: "hidden",
          }}
        >
          <Researcher />
        </Box>
      )}
      {category === "dataset" && (
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            background: "#5F5F5F",
          }}
        >
          <DatasetComponent />
        </Box>
      )}
      {category === "frontend" && (
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            background: "#000",
          }}
        >
          <FrontendComponent />
        </Box>
      )}
      {category === "api" && (
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            background: "#000",
          }}
        >
          {/* <GenerateAPI /> */}
        </Box>
      )}
      {category === "Backend" && (
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            background: "#000",
          }}
        >
          <BackendComponent />
        </Box>
      )}
      {category === "words" && (
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            background: "#000",
          }}
        >
          <ELearningComponent />
        </Box>
      )}
      {category === "text" && (
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            background: "#000",
          }}
        >
          <TextComponent />
        </Box>
      )}
      {category === "memo" && (
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            background: "#000",
          }}
        >
          <MemoComponent />
        </Box>
      )}
      {category === "tests" && (
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            background: "#000",
          }}
        >
          <TestsComponent />
        </Box>
      )}
    </Box>
  );
};

ResearchComponent.propTypes = {};

export default ResearchComponent;
