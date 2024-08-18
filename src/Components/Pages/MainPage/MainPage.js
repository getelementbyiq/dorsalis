import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import SectionOne from "../../Sections/SectionOne";
import SectionSwiper from "../../Components/SectionSwiper";

const MainPage = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
      }}
    >
      <SectionSwiper direction="vertical" />
    </Box>
  );
};

MainPage.propTypes = {};

export default MainPage;
