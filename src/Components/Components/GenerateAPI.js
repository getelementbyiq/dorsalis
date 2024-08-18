import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { UserAuth } from "../../app/Auth";
import { findUserDocument } from "../../app/Slices/createData";
import { useSelector } from "react-redux";
import { BootstrapTooltip } from "./Tooltip";
import { encrypt, shortenText } from "./Crypto";

const GenerateAPI = ({ devDataFetched }) => {
  const { user } = UserAuth();
  // const { apis } = useSelector((state) => state.globalStates);
  const [crudMet, setCrudMet] = useState(["POST", "GET", "PUT", "DELETE"]);
  const [crudToUpload, setCrudToUpload] = useState([]);
  const [apis, setApis] = useState();
  const [createdAPI, setCreatedAPI] = useState([]);

  console.log("apis", apis);
  useEffect(() => {
    fetchUserAPIs();
  }, []);

  useEffect(() => {
    setCrudToUpload(crudMet);
  }, []);

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
  //####################################-----------------------------------Copy

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        // border: "1px solid red",
        flexDirection: "column",
        mt: "16px",
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          flexDirection: "column",
          flexGrow: "1",
        }}
      >
        {Object.keys(devDataFetched)?.map((collection) => (
          <Box
            sx={{
              display: "flex",
              //   flexDirection: "column",
              gap: "4px",
              backgroundColor: "#fff",
              py: "4px",
              borderRadius: "8px",
              px: "8px",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "4px",
                alignItems: "center",
                wixWidth: "150px",
                overflow: "hidden",
                // border: "1px solid red",
              }}
            >
              {apis?.map((API) => {
                if (API?.includes(collection)) {
                  return (
                    <BootstrapTooltip title="Copy the API" key={API}>
                      <Typography
                        onClick={() => copyToClipboard(API)} // Verschlüsselten Text kopieren
                        sx={{
                          fontSize: "12px",
                          fontStyle: "italic",
                          cursor: "pointer",
                          textOverflow: "ellipsis", // textWrap ist kein gültiges CSS-Eigenschaft, use textOverflow
                          overflow: "hidden", // Verhindert, dass der Text aus dem Container herausläuft
                          whiteSpace: "nowrap", // Verhindert Zeilenumbrüche
                        }}
                      >
                        {API}
                      </Typography>
                    </BootstrapTooltip>
                  );
                }
                return null; // Rückgabe von null, wenn die Bedingung nicht erfüllt ist
              })}
            </Box>
          </Box>
        ))}
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

GenerateAPI.propTypes = {};

export default GenerateAPI;
