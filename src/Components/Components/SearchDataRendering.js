import React, { useEffect, useState } from "react";
import {
  CardMedia,
  Typography,
  Box,
  Collapse,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Mousewheel, Pagination } from "swiper/modules";
import LinkWithTooltip from "./IframeLink";
import { BootstrapTooltip } from "./Tooltip";

const SearchResults = ({ searchGoogleData }) => {
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

  console.log("searchGoogleData from", searchGoogleData);
  const getHostName = (url) => {
    try {
      const { hostname } = new URL(url);
      return hostname;
    } catch (e) {
      console.error("Invalid URL:", e);
      return url;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          pb: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {searchGoogleData.map((page) => (
          <Box
            href={page.link}
            sx={{
              px: "8px",
              py: "8px",
              display: "flex",
              gap: "4px",
              flexDirection: "column",
              background: "#fff",
              borderRadius: "4px",
              position: "relative",
            }}
          >
            <Typography
              sx={{
                textWrap: "wrap",
                fontSize: "14px",
                fontWeight: "400",
              }}
            >
              {page.title.split("").map((char, index) => (
                <span key={index}>{char}</span>
              ))}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                textWrap: "wrap",
                color: "rgba(0,0,0,0.8)",
              }}
            >
              {page.snippet.split("").map((char, index) => (
                <span key={index}>{char}</span>
              ))}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "4px",
              }}
            >
              <BootstrapTooltip title="Open in new Tab">
                <IconButton onClick={""}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.50016 14.1667V9.16675L5.8335 10.8334"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.5 9.16675L9.16667 10.8334"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M18.3332 8.33342V12.5001C18.3332 16.6667 16.6665 18.3334 12.4998 18.3334H7.49984C3.33317 18.3334 1.6665 16.6667 1.6665 12.5001V7.50008C1.6665 3.33341 3.33317 1.66675 7.49984 1.66675H11.6665"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M18.3332 8.33341H14.9998C12.4998 8.33341 11.6665 7.50008 11.6665 5.00008V1.66675L18.3332 8.33341Z"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </IconButton>
              </BootstrapTooltip>
              <BootstrapTooltip title="Copy the link">
                <IconButton onClick={() => copyToClipboard(page.link)}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.1665 11.1666V13.6666C14.1665 16.9999 12.8332 18.3333 9.49984 18.3333H6.33317C2.99984 18.3333 1.6665 16.9999 1.6665 13.6666V10.4999C1.6665 7.16659 2.99984 5.83325 6.33317 5.83325H8.83317"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14.1668 11.1666H11.5002C9.50016 11.1666 8.8335 10.4999 8.8335 8.49992V5.83325L14.1668 11.1666Z"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.6665 1.66675H12.9998"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.8335 4.16675C5.8335 2.78341 6.95016 1.66675 8.3335 1.66675H10.5168"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M18.3334 6.66675V11.8251C18.3334 13.1167 17.2834 14.1667 15.9917 14.1667"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M18.3335 6.66675H15.8335C13.9585 6.66675 13.3335 6.04175 13.3335 4.16675V1.66675L18.3335 6.66675Z"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </IconButton>
              </BootstrapTooltip>
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
        ))}
      </Box>
    </Box>
  );
};

export default SearchResults;
