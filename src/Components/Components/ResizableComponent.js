import React, { useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import NotesNew from "./NotesNew";
import LearnLanguageComponent from "./LearnLanguageComponent";
import WordsComponent from "./WordsComponent";
import Collector from "./CodepenClone/Collector";
import GenerateAPI from "./GenerateAPI";
import DevDataRender from "./DevDataRender";
import DevDataRenderFromFirebase from "./DevDataRenderFromFirebase";
import ChunkRenderer from "./ChunkRenderer";
import LeftNavBar from "./LeftNavBar";

const MyComponent = ({
  mainNav,
  mergedData,
  devDataFetched,
  globalStates,
  chunks,
  dataset,
  devData,
  dataToRender,
  responseLangLearning,
  userData,
  updatedWords,
}) => {
  const [leftNavWidth, setLeftNavWidth] = useState(20); // Initial width in percentage
  const [rightNavWidth, setRightNavWidth] = useState(20); // Initial width in percentage

  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "space-between",
      }}
    >
      <ResizableBox
        width={leftNavWidth}
        height={Infinity}
        axis="x"
        resizeHandles={["e"]}
        onResize={(e, data) => setLeftNavWidth(data.size.width)}
        minConstraints={[50, Infinity]} // Minimum width in px
        maxConstraints={[300, Infinity]} // Maximum width in px
        style={{
          display: "flex",
          border: "1px solid red",
          pt: "60px",
          width: `${leftNavWidth}%`,
        }}
      >
        <Grid
          item
          xs={false}
          md={false}
          lg={false}
          sx={{ display: "flex", width: "100%" }}
        >
          <LeftNavBar
            state={mainNav}
            searchGoogleData={mergedData}
            devDataFetched={devDataFetched}
          />
        </Grid>
      </ResizableBox>
      <Grid
        item
        xs={12 - leftNavWidth / 10 - rightNavWidth / 10}
        md={12 - leftNavWidth / 10 - rightNavWidth / 10}
        lg={12 - leftNavWidth / 10 - rightNavWidth / 10}
        sx={{
          display: "flex",
          border: "1px solid red",
          flexDirection: "column",
          position: "relative",
          zIndex: 3000,
        }}
      >
        <Box
          sx={{
            color: "#000",
            display: "flex",
            flexGrow: 1,
          }}
        >
          {/* Search State */}
          {globalStates.mainNav === "search" &&
            globalStates.subNav === "Search" &&
            chunks.map((chunk, index) => (
              <ChunkRenderer key={index} chunk={chunk} />
            ))}
          {/* Dev State */}
          {globalStates.mainNav === "dev" &&
          globalStates.subNav === "Dataset" &&
          dataset?.length > 0 ? (
            <DevDataRenderFromFirebase dataToRender={devData} />
          ) : (
            <DevDataRender dataToRender={dataToRender} />
          )}
          {globalStates.mainNav === "dev" && globalStates.subNav === "API" && (
            <GenerateAPI devDataFetched={devDataFetched} />
          )}
          {globalStates.mainNav === "dev" && globalStates.subNav === "DB" && (
            <Collector />
          )}
          {globalStates.mainNav === "dev" &&
            globalStates.subNav === "Backend" && (
              <Typography>Backend</Typography>
            )}
          {/* Learning State */}
          {globalStates.mainNav === "learning" &&
            globalStates.subNav === "Words" && (
              <WordsComponent words={updatedWords} />
            )}
          {globalStates.mainNav === "learning" &&
            globalStates.subNav === "Text" && (
              <LearnLanguageComponent
                responseLangLearning={responseLangLearning}
                userData={userData}
              />
            )}
          {globalStates.mainNav === "learning" &&
            globalStates.subNav === "Memo" && <Typography>Memo</Typography>}
          {globalStates.mainNav === "learning" &&
            globalStates.subNav === "Tests" && <Typography>Tests</Typography>}
        </Box>
      </Grid>
      <ResizableBox
        width={rightNavWidth}
        height={Infinity}
        axis="x"
        resizeHandles={["w"]}
        onResize={(e, data) => setRightNavWidth(data.size.width)}
        minConstraints={[50, Infinity]} // Minimum width in px
        maxConstraints={[300, Infinity]} // Maximum width in px
        style={{
          display: "flex",
          border: "1px solid red",
          pt: "60px",
          width: `${rightNavWidth}%`,
        }}
      >
        <Grid
          item
          xs={false}
          md={false}
          lg={false}
          sx={{ display: "flex", width: "100%" }}
        >
          <NotesNew state={mainNav} />
        </Grid>
      </ResizableBox>
    </Grid>
  );
};

export default MyComponent;
