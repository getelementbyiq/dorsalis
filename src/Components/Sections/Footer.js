import React from "react";
import PropTypes from "prop-types";
import { Box, Button, InputBase, TextField, Typography } from "@mui/material";
import { Theme } from "../../Theme";
import { Link } from "react-router-dom";

const Footer = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        height: "100vh",
        background: "#000",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "#fff",
      }}
    >
      <svg
        width="129"
        height="120"
        viewBox="0 0 129 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M45.8941 82.2093C55.4894 88.3768 67.2696 90.7243 78.698 88.4287C73.8014 94.6983 67.1758 98.9984 59.9384 101.078C53.3809 96.5327 48.3941 89.9147 45.8941 82.2093ZM40.1231 73.615C38.3856 71.5365 36.8524 69.232 35.5695 66.7163C29.6805 55.169 30.488 41.9676 36.5554 31.5388C46.4453 27.7278 57.8598 28.2297 67.6996 33.7405C52.0555 40.1599 40.7876 55.2698 40.1344 73.2686C40.1302 73.3841 40.1264 73.4996 40.1231 73.615ZM44.8686 78.3337C44.2845 75.505 44.0272 72.5615 44.1366 69.5463C44.7272 53.2736 55.8208 39.8594 70.6615 35.5865C86.4342 46.4713 91.1764 67.7298 81.5022 84.2916C68.8866 89.1789 54.8861 86.6123 44.8686 78.3337ZM74.934 34.63C87.82 46.7409 92.2616 65.4677 86.2871 82.0334C100.468 74.0658 107.425 57.9229 104.243 42.5919C98.2258 37.604 90.5757 34.4903 82.1613 34.1849C79.6964 34.0955 77.2795 34.2511 74.934 34.63ZM101.125 33.6257C101.08 33.535 101.034 33.4444 100.988 33.3539C91.7751 15.2891 69.6622 8.11312 51.5974 17.3259C48.7671 18.7693 46.2041 20.5294 43.9295 22.541C52.2425 22.4353 60.6802 24.6579 68.2282 29.4365C69.5872 30.2969 70.8835 31.2187 72.116 32.1962C76.5607 30.902 81.2849 30.2856 86.1643 30.4627C91.4493 30.6545 96.4852 31.7615 101.125 33.6257ZM114.326 41.8779C113.939 36.0408 112.387 30.1846 109.561 24.6431C98.4088 2.77518 71.6406 -5.91152 49.7727 5.2408C41.0023 9.71363 34.352 16.6983 30.2516 24.8714C20.924 28.0101 12.5737 34.2518 6.89912 43.2149C-6.23163 63.9553 -0.0628269 91.4133 20.6775 104.544C31.8898 111.643 45.0653 113.101 56.8791 109.666C64.0572 115.386 73.0638 118.94 82.9403 119.299C107.472 120.189 128.08 101.024 128.97 76.4926C129.466 62.8267 123.738 50.3782 114.326 41.8779ZM113.455 54.02C110.771 66.6924 102.597 78.0881 90.1589 84.4315C88.1954 85.4329 86.1923 86.2743 84.1646 86.9606C83.5142 88.2501 82.7952 89.52 82.0066 90.7656C78.1818 96.807 73.1413 101.612 67.4053 105.064C71.1644 106.54 75.233 107.416 79.498 107.571C99.763 108.307 116.787 92.4747 117.523 72.2097C117.76 65.6613 116.268 59.4513 113.455 54.02ZM49.7383 102.514C43.0265 102.512 36.2351 100.671 30.1448 96.8148C13.0115 85.9676 7.9155 63.285 18.7626 46.1516C20.8183 42.9046 23.2991 40.0899 26.0867 37.7341C24.6215 46.7406 25.9071 56.2774 30.3705 65.0292C32.9156 70.0197 36.2739 74.3237 40.2017 77.8622C40.8125 87.1151 44.2729 95.6351 49.7383 102.514Z"
          fill="white"
        />
      </svg>
      <Box
        sx={{
          display: "flex",
          flexGrow: "1",
          // border: "1px solid red",
          maxHeight: "30%",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          mt: "16px",
        }}
      >
        <Typography
          sx={{
            ...Theme.fontPrimary,
            fontSize: "16px",
            color: "#fff",
          }}
        >
          Subscribe to the waiting list for the research tool.
        </Typography>
        <Box
          sx={{
            width: "90%",
            background: "rgba(225,225,225,0.8)",
            borderRadius: "2px",
            color: "#fff",
            p: "8px",
          }}
        >
          <InputBase
            fullWidth
            placeholder="Email"
            type="email"
            // {...register("email")}
            InputProps={{
              style: { borderRadius: "2px", backgroundColor: "#F4F4F4" },
            }}
          />
          <Button
            fullWidth
            sx={{
              background: "rgba(225,225,225,0.8)",
              color: "#000",
            }}
          >
            Subscribe
          </Button>
        </Box>

        <Box
          sx={{
            color: "#fff",
          }}
        >
          <Typography
            sx={{
              ...Theme.fontPrimary,
              fontSize: "12px",
              color: "#fff",
            }}
          >
            contributors
          </Typography>
          <Typography
            sx={{
              ...Theme.fontPrimary,
              fontSize: "12px",
              color: "#fff",
            }}
          >
            Timur Mukanov
          </Typography>

          <Typography
            sx={{
              ...Theme.fontPrimary,
              fontSize: "12px",
              color: "#fff",
            }}
          >
            Esenbek Mukanov
          </Typography>
          <Typography
            sx={{
              ...Theme.fontPrimary,
              fontSize: "12px",
              color: "#fff",
            }}
          >
            Urmat Muratov
          </Typography>
          {/* <Link>https://github.com/getelementbyiq/dorsalis</Link> */}
        </Box>
      </Box>
    </Box>
  );
};

Footer.propTypes = {};

export default Footer;
