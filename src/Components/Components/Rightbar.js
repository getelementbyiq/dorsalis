import React from "react";
import PropTypes from "prop-types";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { UserAuth } from "../../app/Auth";
import { Theme } from "../../Theme";
import avatarBG from "../../assets/images/Frame 5.jpg";
import { useLocation, useNavigate } from "react-router-dom";

const Rightbar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = UserAuth();

  const goTo = (txt) => {
    navigate(txt);
  };
  return (
    <Box
      sx={{
        display: "flex",
        py: "8px",
        alignItems: "center",
        gap: "8px",
        background: user ? "#000" : "none",
        px: "8px",
        cursor: "pointer",

        justifyContent: "flex-end",
        flexGrow: "1",
        height: "100%",
      }}
    >
      {user && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Typography
            sx={{
              ...Theme.fontPrimary,
              color: "#fff",
              fontSize: "14px",
            }}
          ></Typography>
          <IconButton onClick={logout}>
            <Avatar
              // src={avatarBG}
              sx={{
                width: "18px",
                height: "18px",
              }}
            />
          </IconButton>
        </Box>
      )}
      {!user && (
        <Box
          sx={{
            display: "flex",
            gap: "32px",
          }}
        >
          <Typography
            onClick={() => goTo("/signup")}
            sx={{
              ...Theme.fontPrimary,
              fontSize: "14px",
              color: location.pathname.includes("signup") ? "#EBFF00" : "#fff",
            }}
          >
            Sign Up
          </Typography>
          <Typography
            onClick={() => goTo("/signin")}
            sx={{
              ...Theme.fontPrimary,
              fontSize: "14px",
              color: location.pathname.includes("signin") ? "#FF00D6" : "#fff",
            }}
          >
            Sign In
          </Typography>
        </Box>
      )}
    </Box>
  );
};

Rightbar.propTypes = {};

export default Rightbar;
