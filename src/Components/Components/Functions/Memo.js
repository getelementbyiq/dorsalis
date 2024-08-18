import React from "react";
import { Box, Grid } from "@mui/material";
import GoogleDocs from "../NewTextEditor/GoogleDocs";
import CustomTextEditorAdvenced from "../NewTextEditor/AdvencedEditor";
import TldrawComponent from "../NewTextEditor/NewTextEditor";
import Whiteboard from "../NewTextEditor/KonvaEditor";
import Collector from "../CodepenClone/Collector";

const MemoComponent = (props) => {
  return (
    <Grid
      container
      style={{ display: "flex", flexGrow: "1" }} // Sicherstellen, dass das Grid die volle Höhe und Breite einnimmt
    >
      <Collector />
    </Grid>
  );
};

export default MemoComponent;
