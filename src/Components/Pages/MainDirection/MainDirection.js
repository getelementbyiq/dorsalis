import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Box, Divider, Typography } from "@mui/material";
import { Theme } from "../../../Theme";
import {
  setMainNav,
  setProject,
  setProjects,
} from "../../../app/Slices/globalStates";
import ResearchComponent from "../../Components/ResearchComponent";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { doc } from "firebase/firestore";
import { db } from "./../../../firebase";
import { UserAuth } from "../../../app/Auth";
import { createProject } from "../../../app/Slices/createData";

const MainDirection = (props) => {
  const { user } = UserAuth();
  const location = useLocation();
  const { category, id } = useParams();
  const path = location.pathname;
  const [projectsId, setProjectsId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mainNav, subNav, newProject, projects } = useSelector(
    (state) => state.globalStates
  );
  console.log("projects", projects);
  const addProject = (txt) => {
    dispatch(setMainNav(txt));
    // const data = { name: defaultName, id: id, category: txt };
    // dispatch(setProjects({ name: defaultName, id: id, category: txt }));
    // dispatch(createProject({ name: defaultName, id: id, category: txt }));
    dispatch(
      createProject({
        docName: "projects",
        user: user,
        data: { name: `new-${txt}`, category: txt },
      })
    ).then((product) => {
      console.log("createdProject", product);
      navigate(`/doc/${txt}/${product.payload}`);
    });
  };
  const goTo = (category) => {
    navigate(`/dashboard/:${category}`);
  };
  // useEffect(() => {
  //   dispatch(
  //     createProject({
  //       docName: docName,
  //       userid: user.uid,
  //       data: newProject,
  //     })
  //   );
  // }, [newProject, user, dispatch]);

  console.log("category from mainDirection", category);
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        // border: "1px solid red",
        color: "#fff",
        mt: "55px",
        flexDirection: "column",
        // background: "#fff",
      }}
    >
      {category === "addProject" && (
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
            gap: "40px",
            py: "50px",
          }}
        >
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box onClick={() => addProject("research")}>
              <Typography
                sx={{
                  ...Theme.fontPrimary,
                  color: "#fff",
                  fontSize: "20px",
                  cursor: "pointer",
                  transition: "250ms",
                  "&&:hover": {
                    color: "#FF5555",
                    transform: "scale(1.3)",
                  },
                }}
              >
                Research
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ backgroundColor: "#fff" }} />
          <Box
            sx={{
              display: "flex",
              gap: "32px",
            }}
          >
            {/* <Box onClick={() => goTo("dataset")}>
              <Typography
                sx={{
                  ...Theme.fontPrimary,
                  color: "#fff",
                  fontSize: "20px",
                  cursor: "pointer",
                  transition: "250ms",
                  "&&:hover": {
                    color: "#FD5656",
                    transform: "scale(1.3)",
                  },
                }}
              >
                Dataset
              </Typography>
            </Box> */}
            <Box onClick={() => addProject("frontend")}>
              <Typography
                sx={{
                  ...Theme.fontPrimary,
                  color: "#fff",
                  fontSize: "20px",
                  cursor: "pointer",
                  transition: "250ms",
                  "&&:hover": {
                    color: "#56FDC1",
                    transform: "scale(1.3)",
                  },
                }}
              >
                Frontend
              </Typography>
            </Box>
            {/* <Box onClick={() => goTo("api")}>
              <Typography
                sx={{
                  ...Theme.fontPrimary,
                  color: "#fff",
                  fontSize: "20px",
                  cursor: "pointer",
                  transition: "250ms",
                  "&&:hover": {
                    color: "#56FDC1",
                    transform: "scale(1.3)",
                  },
                }}
              >
                API
              </Typography>
            </Box> */}
            {/* <Box onClick={() => addProject("Backend")}>
              <Typography
                sx={{
                  ...Theme.fontPrimary,
                  color: "#fff",
                  fontSize: "20px",
                  cursor: "pointer",
                  transition: "250ms",
                  "&&:hover": {
                    color: "#9F56FD",
                    transform: "scale(1.3)",
                  },
                }}
              >
                Backend
              </Typography>
            </Box> */}
          </Box>
          <Divider sx={{ backgroundColor: "#fff" }} />
          {/* <Box
            sx={{
              display: "flex",
              gap: "32px",
            }}
          >
            <Box onClick={() => goTo("e-learning")}>
              <Typography
                sx={{
                  ...Theme.fontPrimary,
                  color: "#fff",
                  fontSize: "20px",
                  cursor: "pointer",
                  transition: "250ms",
                  "&&:hover": {
                    color: "#FF8A00",
                    transform: "scale(1.3)",
                  },
                }}
              >
                Words
              </Typography>
            </Box>
            <Box onClick={() => goTo("e-learning")}>
              <Typography
                sx={{
                  ...Theme.fontPrimary,
                  color: "#fff",
                  fontSize: "20px",
                  cursor: "pointer",
                  transition: "250ms",
                  "&&:hover": {
                    color: "#EBFF00",
                    transform: "scale(1.3)",
                  },
                }}
              >
                Text
              </Typography>
            </Box>
            <Box onClick={() => goTo("e-learning")}>
              <Typography
                sx={{
                  ...Theme.fontPrimary,
                  color: "#fff",
                  fontSize: "20px",
                  cursor: "pointer",
                  transition: "250ms",
                  "&&:hover": {
                    color: "#00FFA3",
                    transform: "scale(1.3)",
                  },
                }}
              >
                Memo
              </Typography>
            </Box>
            <Box onClick={() => addProject("tests")}>
              <Typography
                sx={{
                  ...Theme.fontPrimary,
                  color: "#fff",
                  fontSize: "20px",
                  cursor: "pointer",
                  transition: "250ms",
                  "&&:hover": {
                    color: "#00D1FF",
                    transform: "scale(1.3)",
                  },
                }}
              >
                Tests
              </Typography>
            </Box>
          </Box> */}
        </Box>
      )}
      {/* {mainNav === "research" && <ResearchComponent />} */}
      <Box
        sx={{
          display: "flex",
          // border: "1px solid white",
          flexGrow: "1",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            ...Theme.fonts,
            fontSize: "42px",
            color: "#fff",
          }}
        >
          Community
        </Typography>
      </Box>
    </Box>
  );
};

MainDirection.propTypes = {};

export default MainDirection;
