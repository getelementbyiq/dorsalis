import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Theme } from "../../../Theme";
import Leftbar from "../../Components/Leftbar";
import Rightbar from "../../Components/Rightbar";
import Header from "../../Components/Header";
import { Outlet } from "react-router-dom";
import { UserAuth } from "../../../app/Auth";
import { findUserDocument } from "../../../app/Slices/createData";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { useDispatch } from "react-redux";
import { setProjects } from "../../../app/Slices/globalStates";

const Mainlayout = (props) => {
  const { user } = UserAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) return;

    const fetchAndListenToDataset = async () => {
      try {
        // Finde das Benutzer-Dokument
        const userDocRef = await findUserDocument(user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          console.error("User document not found");
          return;
        }

        // Hole die Dataset-IDs aus dem Benutzer-Dokument
        const userData = userDocSnap.data();
        const projects = userData.projects || [];
        console.log("projects", projects);
        if (projects.length === 0) {
          console.error("No dataset documents found for the user");
          return;
        }

        // Nehmen wir an, wir verwenden nur das erste Dataset-Dokument
        const projectsId = projects[0];
        const datasetDocRef = doc(db, "projects", projectsId);
        const subCollectionRef = collection(datasetDocRef, "projects");

        const unsubscribe = onSnapshot(
          subCollectionRef,
          (querySnapshot) => {
            let dataProjects = [];

            querySnapshot.forEach((doc) => {
              const data = doc.data();

              if (data.createdAt && data.createdAt.seconds) {
                // Konvertiere den Timestamp in einen ISO-String
                data.createdAt = new Date(
                  data.createdAt.seconds * 1000
                ).toISOString();
              }
              dataProjects.push({ id: doc.id, ...data, xid: projectsId });
            });

            dataProjects = dataProjects.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );

            dispatch(setProjects(dataProjects));
            // dispatch(setProjects(dataProjects));
          },
          (error) => {
            console.error("Error fetching data: ", error);
          }
        );

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching user document: ", error);
      }
    };

    fetchAndListenToDataset();
  }, [user]);
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        // border: "1px solid red",
        backgroundColor: Theme.black.bg,
        height: "100vh",
      }}
    >
      <Header />
      <Outlet />
    </Box>
  );
};

Mainlayout.propTypes = {};

export default Mainlayout;
