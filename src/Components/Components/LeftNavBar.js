import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Alert,
  Avatar,
  Box,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import CBG from "../../assets/images/Firefly generate colorfull Crossword puzzle 9985.jpg";
import MBG from "../../assets/images/Firefly generate colorfull memo card game, on two of them images of animals 9985.jpg";
import { rightNav } from "./NavDB";
import { BootstrapTooltip } from "./Tooltip";
import Rightbar from "./Rightbar";
import { UserAuth } from "../../app/Auth";
import TextEditor from "./TextEditor";
import SearchResults from "./SearchDataRendering";
import { useDispatch, useSelector } from "react-redux";
import {
  setDatasetAPIS,
  setDatasetId,
  setSubNav,
} from "../../app/Slices/globalStates";
import { findUserDocument } from "../../app/Slices/createData";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import CopyablePasswordField from "./APICopy";
import FigmaEmbed from "./FigmaEbmed";
import DraggableCard from "./DraggebleEmbed";

const LeftNavBar = ({ searchGoogleData, devDataFetched }) => {
  const figmaUrl =
    "https://www.figma.com/design/6VdS25CW0PUQjvrQkyBKY8/Untitled?node-id=246-2397&t=SXXwgJ5RsSI990f7-1";

  const dispatch = useDispatch();
  const golbalState = useSelector((state) => state.globalStates);
  const { subNav, mainNav } = golbalState;
  const { user } = UserAuth();
  const password = user.uid;
  const [leftNavState, setLeftNavState] = useState("Crosswords");
  const [apis, setApis] = useState([]);

  console.log("Apissss", apis);
  const handleLeftNav = (txt) => {
    setLeftNavState(txt);
    if (txt === "API") {
      fetchUserAPIs();
    }
  };
  const openDataset = (id) => {
    dispatch(setDatasetId(id));
  };
  useEffect(() => {
    mainNav && setLeftNavState(rightNav[mainNav][0]?.nav);
  }, [mainNav]);
  useEffect(() => {
    dispatch(setSubNav(leftNavState));
  }, [leftNavState, dispatch]);
  useEffect(() => {
    dispatch(setDatasetAPIS(apis));
  }, [apis, dispatch]);
  //####################################-----------------------------------Copy
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const copyToClipboard = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      setSnackbarMessage("Link copied to clipboard!");
      setOpenSnackbar(true);
    } catch (err) {
      setSnackbarMessage("Failed to copy link.");
      setOpenSnackbar(true);
    }
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  //####################################-----------------------------------Copy

  const fetchUserAPIs = async () => {
    if (!user) return;

    try {
      const userDocRef = await findUserDocument(user.uid);
      const userDocSnap = await getDoc(userDocRef);
      const userData = userDocSnap.data();
      const datasets = userData.datasets || [];

      if (datasets.length === 0) {
        console.error("No dataset documents found for the user");
        return;
      }

      const datasetId = datasets[0];
      const datasetDocRef = doc(db, "datasets", datasetId);
      const datasetDocSnap = await getDoc(datasetDocRef);

      if (datasetDocSnap.exists()) {
        const datasetData = datasetDocSnap.data();
        setApis(datasetData.APIs || []);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching APIs:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        // border: "1px solid red",
        // position: "fixed",
        left: "4px",
        // flexDirection: "column",
        // alignItems: "flex-end",
        py: "4px",
        // top: "64px",
        // gap: "4px",
        background: "rgba(0,0,0,0.08)",
        // height: "85vh",
        // width: "15%",
        borderRadius: "16px",
        flexDirection: "column",
        color: "#000",
        flexGrow: "1",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "4px",
          justifyContent: "space-evenly",
          px: "4px",
        }}
      >
        {rightNav[mainNav]?.map((navItem, index) => (
          <Box
            sx={{
              position: "relative",
              display: "flex",
              cursor: "pointer",
              // Conditional styles
              "&:after": {
                content: '""',
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                height: "2px",
                backgroundColor:
                  leftNavState === navItem?.nav ? "black" : "transparent",
                transition: "background-color 0.15s ease",
              },
            }}
          >
            <Typography
              onClick={() => handleLeftNav(navItem?.nav)}
              sx={{
                fontSize: "12px",
                textAlign: "center",
                color:
                  leftNavState === navItem.nav
                    ? "rgba(0,0,0,1)"
                    : "rgba(0,0,0,0.4)",
              }}
            >
              {navItem.nav}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Divider sx={{ width: "80%", solor: "blue" }} />
      </Box>

      <Box
        className="searchResult-wrapper"
        sx={{
          color: "#000",
          display: "flex",
          // background: "grey",
          px: "4px",
          gap: "4px",
          flexGrow: "1",
          overflow: "auto",
          padingBottom: "24px",
        }}
      >
        <Box
          sx={{
            color: "#000",
            display: "flex",
            // border: "1px solid red",
            // background: "grey",
            flexDirection: "column",
            gap: "4px",
            flexGrow: "1",
            // overflow: "auto",
          }}
        >
          {mainNav === "search" && (
            <SearchResults searchGoogleData={searchGoogleData} />
          )}
          {subNav === "Dataset" &&
            Object.keys(devDataFetched)?.map((set) => (
              <Box
                onClick={() => openDataset(set)}
                key={set}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  py: "4px",
                  px: "4px",
                  borderRadius: "4px",
                  background: "#fff",
                  "&&:hover": {
                    background: "blue",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  {set}
                </Typography>
              </Box>
            ))}

          {/* {subNav === "DB" && (
            // <FigmaEmbed url={figmaUrl} width="180px" height="450px" />
            <DraggableCard figmaUrl={figmaUrl} />
          )} */}
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

LeftNavBar.propTypes = {};

export default LeftNavBar;
