import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import GoogleDocs from "../NewTextEditor/GoogleDocs";
import CustomTextEditorAdvenced from "../NewTextEditor/AdvencedEditor";
import TldrawComponent from "../NewTextEditor/NewTextEditor";
import Whiteboard from "../NewTextEditor/KonvaEditor";
import Collector from "../CodepenClone/Collector";
import GenerateAPI from "../GenerateAPI";

const APIComponent = (props) => {
  const [devDataFetched, setDevDataFetched] = useState(null);

  return (
    <Grid
      container
      style={{ display: "flex", flexGrow: "1" }} // Sicherstellen, dass das Grid die volle Höhe und Breite einnimmt
    >
      <GenerateAPI devDataFetched={devDataFetched} />
    </Grid>
  );
};

export default APIComponent;
