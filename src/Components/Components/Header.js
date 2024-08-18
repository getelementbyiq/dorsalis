import React from "react";
import PropTypes from "prop-types";
import { AppBar, Box, Grid, Toolbar } from "@mui/material";
import Leftbar from "./Leftbar";
import Rightbar from "./Rightbar";

const Header = (props) => {
  return (
    <>
      <AppBar
        sx={{
          background: "#000",
          boxShadow: "none",
          justifyContent: "start-flex",
          px: "24px",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            // py: "8px",
            justifyContent: "space-between",
            alignItems: "center",
            // border: "1px solid red",
            flexGrow: "1",
          }}
        >
          <Grid
            item
            xs={2}
            md={2}
            lg={2}
            sx={{
              display: "flex",
              // border: "1px solid blue",
            }}
          >
            <Leftbar />
          </Grid>
          <Grid item xs={8} md={8} lg={8}></Grid>
          <Grid
            item
            xs={2}
            md={2}
            lg={2}
            sx={{
              display: "flex",
              // border: "1px solid yellow",
              flexGrow: "1",
              height: "100%",
            }}
          >
            <Rightbar />
          </Grid>
        </Grid>
      </AppBar>
    </>
  );
};

Header.propTypes = {};

export default Header;
