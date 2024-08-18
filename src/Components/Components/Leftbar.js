import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { Theme } from "../../Theme";
import { UserAuth } from "../../app/Auth";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BootstrapTooltip } from "./Tooltip";
import {
  setMainNav,
  setProject,
  setProjects,
} from "../../app/Slices/globalStates";
import { useDispatch, useSelector } from "react-redux";

const Leftbar = (props) => {
  const dispatch = useDispatch();
  const { user } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [modeState, setModeState] = useState("search");
  const [hovered, setHovered] = useState(false);
  const { addProject, projects } = useSelector((state) => state.globalStates);
  const { id, category } = useParams();

  const openProject = ({ id, category }) => {
    dispatch(setMainNav(id));
    navigate(`/doc/${category}/${id}`);
  };
  const createProject = (link) => {
    navigate(`dashboard/${link}`);
  };
  const goHome = (link) => {
    navigate(`/`);
  };

  const goTo = (category) => {
    navigate(`dashboard/${category}`);
  };

  useEffect(() => {
    dispatch(setMainNav(modeState));
  }, [modeState, dispatch]);
  const handleHover = () => {
    setHovered((open) => !open);
  };
  const handleSetMainNav = (txt) => {
    dispatch(setMainNav(txt));
  };
  return (
    <Box
      sx={{
        display: "flex",
        py: "8px",
        alignItems: "center",
        gap: "8px",
        px: "8px",
        cursor: "pointer",

        justifyContent: "flex-start",
        flexGrow: "1",
      }}
    >
      <Box
        onClick={goHome}
        sx={{
          display: "flex",
          p: "4px",
          gap: "4px",
          alignItems: "center",
          transition: "150ms",
          "&&:hover": {
            transform: "scale(1.2)",
          },
        }}
      >
        <svg
          width="27"
          height="24"
          viewBox="0 0 27 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.26017 16.5107C11.1963 17.7552 13.5733 18.2289 15.8793 17.7657C14.8914 19.0306 13.5547 19.8982 12.0946 20.3178C10.7712 19.4008 9.76478 18.0655 9.26017 16.5107ZM8.09527 14.7765C7.74485 14.3572 7.43564 13.8924 7.17687 13.385C5.98863 11.0551 6.15158 8.39136 7.37586 6.28711C9.37108 5.51818 11.6739 5.61921 13.6591 6.73065C10.5028 8.02595 8.22935 11.0746 8.09755 14.7061C8.0967 14.7296 8.09594 14.7531 8.09527 14.7765ZM9.05325 15.7291C8.93523 15.158 8.88322 14.5638 8.90532 13.955C9.02447 10.6718 11.2626 7.96533 14.2568 7.10304C17.4401 9.29911 18.3973 13.589 16.445 16.9311C13.8995 17.9173 11.0746 17.3995 9.05325 15.7291ZM15.1188 6.91002C17.7194 9.35374 18.6158 13.1328 17.41 16.4757C20.2717 14.8679 21.6756 11.6101 21.0329 8.51634C19.8189 7.50997 18.2753 6.88175 16.5776 6.82014C16.0801 6.80208 15.5923 6.83351 15.1188 6.91002ZM20.4036 6.70731C20.3946 6.68934 20.3855 6.67139 20.3764 6.65347C18.5175 3.00853 14.0558 1.56063 10.4108 3.4195C9.83994 3.71065 9.32293 4.06566 8.86409 4.47138C10.5413 4.45014 12.2436 4.89859 13.7664 5.8627C14.0404 6.03614 14.3017 6.22198 14.5502 6.41901C15.4471 6.15782 16.4004 6.03342 17.385 6.06916C18.4513 6.10786 19.4674 6.3312 20.4036 6.70731ZM23.0678 8.37296C22.9898 7.19528 22.6766 6.01373 22.1064 4.89567C19.8562 0.483373 14.4552 -1.26934 10.0429 0.980863C8.27338 1.8833 6.93161 3.2925 6.10425 4.94146C4.22207 5.57472 2.53707 6.83416 1.39204 8.64277C-1.25736 12.8276 -0.0126768 18.3678 4.17211 21.0172C6.4345 22.4495 9.09303 22.7437 11.4768 22.0505C12.925 23.2043 14.742 23.9213 16.7345 23.9936C21.6842 24.1732 25.8424 20.3063 26.022 15.3566C26.1221 12.5995 24.9666 10.0881 23.0678 8.37296ZM22.8922 10.823C22.3506 13.3799 20.7014 15.6793 18.1916 16.9592C17.7953 17.1613 17.391 17.3311 16.9818 17.4696C16.8506 17.7297 16.7056 17.9858 16.5465 18.2371C15.7749 19.4559 14.7581 20.4253 13.601 21.1217C14.3593 21.4194 15.1799 21.5961 16.0402 21.6273C20.1291 21.7757 23.5641 18.5813 23.7125 14.4924C23.7604 13.1714 23.4595 11.9187 22.8922 10.823ZM10.0359 20.6077C8.68173 20.6072 7.3115 20.2357 6.08273 19.4578C2.62572 17.2691 1.59751 12.6924 3.78614 9.23543C4.20088 8.58035 4.70136 8.01248 5.26374 7.53718C4.96814 9.35438 5.22756 11.2786 6.1281 13.0444C6.6415 14.0511 7.3189 14.9193 8.11116 15.6332C8.23446 17.5004 8.93286 19.2197 10.0359 20.6077Z"
            fill="white"
          />
        </svg>
      </Box>

      <Divider
        orientation="vertical"
        sx={{ background: "#fff", height: "5%" }}
      />
      {user && (
        <Box
          sx={{
            // border: "1px solid red",
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            alignItems: "center",
            // position: "fixed",
            // top: "8px",
            // right: "50%",
            // transform: "translate(50%)",
            zIndex: "2000",
            // px: "4px",
            // py: "2px",
            // borderRadius: "32px",
            // background: "rgba(225,225,225,0.2)",
            // backdropFilter: "blur(15px)",
          }}
        >
          <Box
            onClick={() => goTo("dataset")}
            sx={{
              display: "flex",
              background: location.pathname.includes("dataset")
                ? "#C5B5F1"
                : "#000",
              p: "4px",
              gap: "4px",
              color: location.pathname.includes("dataset") ? "#000" : "#fff",
              alignItems: "center",
              "&&:hover": {
                background: "#CCCEFF",
                color: "#000",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontFamily: "Inconsolata, monospace",
                fontWeight: "400",
                fontStyle: "normal",
              }}
            >
              Dataset
            </Typography>
          </Box>
          <Divider
            orientation="vertical"
            sx={{ background: "#fff", border: "1px solid #fff" }}
          />

          <Box
            onClick={() => goTo("e-learning")}
            sx={{
              display: "flex",
              p: "4px",
              gap: "4px",
              color: location.pathname.includes("e-learning") ? "#000" : "#fff",
              background: location.pathname.includes("e-learning")
                ? "#B5F1E3"
                : "#000",
              alignItems: "center",
              "&&:hover": {
                background: "#CCCEFF",
                color: "#000",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontFamily: "Inconsolata, monospace",
                fontWeight: "400",
                fontStyle: "normal",
                textWrap: "nowrap",
              }}
            >
              E-learning
            </Typography>
          </Box>
          <Divider
            orientation="vertical"
            sx={{ background: "#fff", border: "1px solid #fff" }}
          />
          {projects?.map((project) => (
            <>
              <Box
                onClick={() =>
                  openProject({ id: project.id, category: project.category })
                }
                sx={{
                  display: "flex",
                  p: "4px",
                  gap: "4px",
                  background: id === project.id ? "#E4CCFF" : "none",
                  color: id === project.id ? "#000" : "#fff",
                  alignItems: "center",
                  "&&:hover": {
                    background: "#E4CCFF",
                    color: "#000",
                  },
                }}
              >
                <Typography
                  sx={{
                    textWrap: "nowrap",
                    fontSize: "14px",
                    fontFamily: "Inconsolata, monospace",
                    fontWeight: "400",
                    fontStyle: "normal",
                  }}
                >
                  {project.name}
                </Typography>
              </Box>
              <Divider
                orientation="vertical"
                sx={{ background: "#fff", border: "1px solid #fff" }}
              />
            </>
          ))}
          <Box
            onClick={() => createProject("addProject")}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            sx={{
              display: "flex",
              p: "4px",
              gap: "4px",
              background: category === "addProject" ? "#E4CCFF" : "none",
              color: category === "addProject" ? "#000" : "#fff",
              alignItems: "center",
              "&&:hover": {
                background: "#E4CCFF",
                color: "#000",
              },
            }}
          >
            <Typography
              sx={{
                textWrap: "nowrap",
                fontSize: "14px",
                fontFamily: "Inconsolata, monospace",
                fontWeight: "400",
                fontStyle: "normal",
              }}
            >
              New project
            </Typography>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.5 7H10.5"
                stroke={hovered ? "#000" : "#fff"}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7 10.5V3.5"
                stroke={hovered ? "#000" : "#fff"}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Box>
          <Divider
            orientation="vertical"
            sx={{ background: "#fff", border: "1px solid #fff" }}
          />

          {/* <BootstrapTooltip title="Search mode">
          <IconButton
            onClick={() => handleModeState("search")}
            sx={{
              position: "relative",
              zIndex: "2000",
              background: modeState === "search" ? "#000" : "none",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.58341 17.5C13.9557 17.5 17.5001 13.9555 17.5001 9.58329C17.5001 5.21104 13.9557 1.66663 9.58341 1.66663C5.21116 1.66663 1.66675 5.21104 1.66675 9.58329C1.66675 13.9555 5.21116 17.5 9.58341 17.5Z"
                stroke={
                  modeState === "search"
                    ? "rgba(225,225,225,1)"
                    : "rgba(225,225,225,0.5)"
                }
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.3334 18.3333L16.6667 16.6666"
                stroke={
                  modeState === "search"
                    ? "rgba(225,225,225,1)"
                    : "rgba(225,225,225,0.5)"
                }
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </IconButton>
        </BootstrapTooltip>
        <BootstrapTooltip title="Dev mode">
          <IconButton
            onClick={() => handleModeState("dev")}
            sx={{
              position: "relative",
              zIndex: "2000",
              background: modeState === "dev" ? "#000" : "none",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66667 8.33325L5 9.99992L6.66667 11.6666"
                stroke={
                  modeState === "dev"
                    ? "rgba(225,225,225,1)"
                    : "rgba(225,225,225,0.5)"
                }
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.3335 8.33325L15.0002 9.99992L13.3335 11.6666"
                stroke={
                  modeState === "dev"
                    ? "rgba(225,225,225,1)"
                    : "rgba(225,225,225,0.5)"
                }
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.99984 18.3334C14.6022 18.3334 18.3332 14.6025 18.3332 10.0001C18.3332 5.39771 14.6022 1.66675 9.99984 1.66675C5.39746 1.66675 1.6665 5.39771 1.6665 10.0001C1.6665 14.6025 5.39746 18.3334 9.99984 18.3334Z"
                stroke={
                  modeState === "dev"
                    ? "rgba(225,225,225,1)"
                    : "rgba(225,225,225,0.5)"
                }
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.8332 8.05835L9.1665 11.9417"
                stroke={
                  modeState === "dev"
                    ? "rgba(225,225,225,1)"
                    : "rgba(225,225,225,0.5)"
                }
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </IconButton>
        </BootstrapTooltip>
        <BootstrapTooltip title="Learning mode">
          <IconButton
            onClick={() => handleModeState("learning")}
            sx={{
              position: "relative",
              zIndex: "2000",
              background: modeState === "learning" ? "#000" : "none",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.37477 2.10824L3.35811 5.38324C1.74977 6.43324 1.74977 8.78324 3.35811 9.83324L8.37477 13.1082C9.27477 13.6999 10.7581 13.6999 11.6581 13.1082L16.6498 9.83324C18.2498 8.78324 18.2498 6.44157 16.6498 5.39157L11.6581 2.11657C10.7581 1.51657 9.27477 1.51657 8.37477 2.10824Z"
                stroke={
                  modeState === "learning"
                    ? "rgba(225,225,225,1)"
                    : "rgba(225,225,225,0.5)"
                }
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.69144 10.8999L4.68311 14.8082C4.68311 15.8666 5.49977 16.9999 6.49977 17.3332L9.15811 18.2166C9.61644 18.3666 10.3748 18.3666 10.8414 18.2166L13.4998 17.3332C14.4998 16.9999 15.3164 15.8666 15.3164 14.8082V10.9416"
                stroke={
                  modeState === "learning"
                    ? "rgba(225,225,225,1)"
                    : "rgba(225,225,225,0.5)"
                }
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.8335 12.5V7.5"
                stroke={
                  modeState === "learning"
                    ? "rgba(225,225,225,1)"
                    : "rgba(225,225,225,0.5)"
                }
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </IconButton>
        </BootstrapTooltip> */}
        </Box>
      )}
    </Box>
  );
};

Leftbar.propTypes = {};

export default Leftbar;
