// {/* <Grid
//   container
//   sx={{
//     display: "flex",
//     flexGrow: "1",
//     justifyContent: "space-between",
//   }}
// >
//   <Grid
//     item
//     xs={2}
//     md={2}
//     lg={2}
//     sx={{
//       display: "flex",
//       width: "20%",
//       border: "1px solid red",
//       pt: "60px",
//     }}
//   >
//     <LeftNavBar
//       state={mainNav}
//       searchGoogleData={mergedData}
//       devDataFetched={devDataFetched}
//     />
//   </Grid>
//   <Grid
//     item
//     xs={12 - leftNavWidth / 10 - rightNavWidth / 10}
//     md={12 - leftNavWidth / 10 - rightNavWidth / 10}
//     lg={12 - leftNavWidth / 10 - rightNavWidth / 10}
//     sx={{
//       display: "flex",
//       // justifyContent: "center",
//       border: "1px solid red",
//       flexDirection: "column",
//       // maxWidth: "0%",
//       position: "relative",
//       zIndex: "3000",
//     }}
//   >
//     <Box
//       sx={{
//         color: "#000",
//         display: "flex",
//         flexGrow: "1",
//       }}
//     >
//       {/* Search State----------------------------------------------------------------------- */}
//       {globalStates.mainNav === "search" &&
//         globalStates.subNav === "Search" &&
//         chunks.map((chunk, index) => (
//           <ChunkRenderer key={index} chunk={chunk} />
//         ))}
//       {/* Search State----------------------------------------------------------------------- */}
//       {/* Dev State----------------------------------------------------------------------- */}
//       {globalStates.mainNav === "dev" &&
//       globalStates.subNav === "Dataset" &&
//       dataset?.length > 0 ? (
//         <DevDataRenderFromFirebase dataToRender={devData} />
//       ) : (
//         <DevDataRender dataToRender={dataToRender} />
//       )}
//       {globalStates.mainNav === "dev" && globalStates.subNav === "API" && (
//         <GenerateAPI devDataFetched={devDataFetched} />
//       )}
//       {globalStates.mainNav === "dev" && globalStates.subNav === "DB" && (
//         // <CodeEditor />
//         // <ReactPreview />
//         // <FullCompilor />
//         <Collector />
//       )}
//       {globalStates.mainNav === "dev" && globalStates.subNav === "Backend" && (
//         <Typography>Backend</Typography>
//       )}

//       {/* Dev State----------------------------------------------------------------------- */}

//       {/* Learning State----------------------------------------------------------------------- */}
//       {globalStates.mainNav === "learning" &&
//         globalStates.subNav === "Words" && (
//           <WordsComponent words={updatedWords} />
//         )}
//       {globalStates.mainNav === "learning" &&
//         globalStates.subNav === "Text" && (
//           <LearnLanguageComponent
//             responseLangLearning={responseLangLearning}
//             userData={userData}
//           />
//         )}
//       {globalStates.mainNav === "learning" &&
//         globalStates.subNav === "Memo" && <Typography>Memo</Typography>}
//       {globalStates.mainNav === "learning" &&
//         globalStates.subNav === "Tests" && <Typography>Tests</Typography>}
//       {/* Learning State----------------------------------------------------------------------- */}
//     </Box>
//   </Grid>
//   <Grid
//     item
//     xs={2}
//     md={2}
//     lg={2}
//     sx={{
//       display: "flex",
//       width: "20%",
//       border: "1px solid red",
//       pt: "60px",
//     }}
//   >
//     <NotesNew state={mainNav} />
//   </Grid>
// </Grid>; */}
