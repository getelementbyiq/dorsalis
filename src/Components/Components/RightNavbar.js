import React, { useState } from "react";
import PropTypes from "prop-types";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import CBG from "../../assets/images/Firefly generate colorfull Crossword puzzle 9985.jpg";
import MBG from "../../assets/images/Firefly generate colorfull memo card game, on two of them images of animals 9985.jpg";
import { rightNav } from "./NavDB";
import { BootstrapTooltip } from "./Tooltip";
import Rightbar from "./Rightbar";
import { UserAuth } from "../../app/Auth";

const RightNavbar = ({ state }) => {
  const { user } = UserAuth();
  const [rightNavState, setRightNavState] = useState("Crosswords");
  const handleRightNav = (txt) => {
    setRightNavState(txt);
  };
  return (
    <Box
      sx={{
        display: "flex",
        border: "1px solid red",
        position: "fixed",
        right: "24px",
        // flexDirection: "column",
        // alignItems: "flex-end",
        py: "4px",
        bottom: "12px",
        gap: "16px",
        alignItems: "center",
      }}
    >
      {rightNav[state].map((navItem, index) => (
        <Box
          onClick={() => handleRightNav(navItem.nav)}
          key={index}
          sx={{
            color:"#000",
            display: "flex",
            cursor: "pointer",
            // border: "1px solid red",
            // background: "grey",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Avatar
            sx={{
              width: "28px",
              height: "28px",
              border:
                rightNavState === navItem.nav
                  ? "1px solid rgba(0,0,0,0.2)"
                  : "none",
              backgroundColor:
                rightNavState === navItem.nav ? "#F5F5F5" : "#fff",
              boxShadow:
                rightNavState === navItem.nav
                  ? "inset -1px -1px 1px 0 #d2d2d2, inset 1px 1px 1px 0 #fff, -4px -4px 12px 0 #fff, 8px 8px 12px 0 #d6d6d6"
                  : "none",
            }}
          >
            {navItem.nav === "Crosswords" ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.49996 18.3332H12.5C16.6666 18.3332 18.3333 16.6665 18.3333 12.4998V7.49984C18.3333 3.33317 16.6666 1.6665 12.5 1.6665H7.49996C3.33329 1.6665 1.66663 3.33317 1.66663 7.49984V12.4998C1.66663 16.6665 3.33329 18.3332 7.49996 18.3332Z"
                  stroke={rightNavState === navItem.nav ? "#292D32" : "#AFAFAF"}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.0417 12.5H12.5"
                  stroke={rightNavState === navItem.nav ? "#292D32" : "#AFAFAF"}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.1667 7.5H12.625"
                  stroke={rightNavState === navItem.nav ? "#292D32" : "#AFAFAF"}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.55829 12.5H4.16663"
                  stroke={rightNavState === navItem.nav ? "#292D32" : "#AFAFAF"}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.3917 7.5H5"
                  stroke={rightNavState === navItem.nav ? "#292D32" : "#AFAFAF"}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.9999 10H10.3916"
                  stroke={rightNavState === navItem.nav ? "#292D32" : "#AFAFAF"}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.14171 10H5.83337"
                  stroke={rightNavState === navItem.nav ? "#292D32" : "#AFAFAF"}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : navItem.nav === "Memo" ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3333 7.09984V3.3165C18.3333 2.1415 17.8 1.6665 16.475 1.6665H13.1083C11.7833 1.6665 11.25 2.1415 11.25 3.3165V7.0915C11.25 8.27484 11.7833 8.7415 13.1083 8.7415H16.475C17.8 8.74984 18.3333 8.27484 18.3333 7.09984Z"
                  fill={rightNavState === navItem.nav ? "#292D32" : "#AFAFAF"}
                  stroke={rightNavState === navItem.nav ? "#292D32" : "#AFAFAF"}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.3333 16.475V13.1083C18.3333 11.7833 17.8 11.25 16.475 11.25H13.1083C11.7833 11.25 11.25 11.7833 11.25 13.1083V16.475C11.25 17.8 11.7833 18.3333 13.1083 18.3333H16.475C17.8 18.3333 18.3333 17.8 18.3333 16.475Z"
                  stroke={rightNavState === navItem.nav ? "#292D32" : "#AFAFAF"}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.74996 7.09984V3.3165C8.74996 2.1415 8.21663 1.6665 6.89163 1.6665H3.52496C2.19996 1.6665 1.66663 2.1415 1.66663 3.3165V7.0915C1.66663 8.27484 2.19996 8.7415 3.52496 8.7415H6.89163C8.21663 8.74984 8.74996 8.27484 8.74996 7.09984Z"
                  stroke={rightNavState === navItem.nav ? "#292D32" : "#AFAFAF"}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.74996 16.475V13.1083C8.74996 11.7833 8.21663 11.25 6.89163 11.25H3.52496C2.19996 11.25 1.66663 11.7833 1.66663 13.1083V16.475C1.66663 17.8 2.19996 18.3333 3.52496 18.3333H6.89163C8.21663 18.3333 8.74996 17.8 8.74996 16.475Z"
                  fill={rightNavState === navItem.nav ? "#292D32" : "#AFAFAF"}
                  stroke={rightNavState === navItem.nav ? "#292D32" : "#AFAFAF"}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : navItem.nav === "Notes" ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.1665 11.1666V13.6666C14.1665 16.9999 12.8332 18.3333 9.49984 18.3333H6.33317C2.99984 18.3333 1.6665 16.9999 1.6665 13.6666V10.4999C1.6665 7.16659 2.99984 5.83325 6.33317 5.83325H8.83317"
                  stroke={rightNavState === navItem.nav ? "#292D32" : "#AFAFAF"}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.1668 11.1666H11.5002C9.50016 11.1666 8.8335 10.4999 8.8335 8.49992V5.83325L14.1668 11.1666Z"
                  stroke={rightNavState === navItem.nav ? "#292D32" : "#AFAFAF"}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.6665 1.66675H12.9998"
                  stroke={rightNavState === navItem.nav ? "#292D32" : "#AFAFAF"}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.8335 4.16675C5.8335 2.78341 6.95016 1.66675 8.3335 1.66675H10.5168"
                  stroke={rightNavState === navItem.nav ? "#292D32" : "#AFAFAF"}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.3334 6.66675V11.8251C18.3334 13.1167 17.2834 14.1667 15.9917 14.1667"
                  stroke={rightNavState === navItem.nav ? "#292D32" : "#AFAFAF"}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.3335 6.66675H15.8335C13.9585 6.66675 13.3335 6.04175 13.3335 4.16675V1.66675L18.3335 6.66675Z"
                  stroke={rightNavState === navItem.nav ? "#292D32" : "#AFAFAF"}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.99984 14.1667V16.15C9.99984 17.7083 9.37484 18.3333 7.80817 18.3333H3.84984C2.2915 18.3333 1.6665 17.7083 1.6665 16.15V12.1917C1.6665 10.625 2.2915 10 3.84984 10H5.83317V11.975C5.83317 13.5417 6.45817 14.1667 8.0165 14.1667H9.99984Z"
                  stroke={rightNavState === navItem.nav ? "#292D32" : "#AFAFAF"}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.1668 9.99992V11.9749C14.1668 13.5416 13.5418 14.1666 11.9752 14.1666H8.01683C6.4585 14.1666 5.8335 13.5416 5.8335 11.9749V8.01659C5.8335 6.45825 6.4585 5.83325 8.01683 5.83325H10.0002V7.80825C10.0002 9.37492 10.6252 9.99992 12.1835 9.99992H14.1668Z"
                  stroke={rightNavState === navItem.nav ? "#292D32" : "#AFAFAF"}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.3333 3.85008V7.80841C18.3333 9.37508 17.7083 10.0001 16.1417 10.0001H12.1833C10.625 10.0001 10 9.37508 10 7.80841V3.85008C10 2.29175 10.625 1.66675 12.1833 1.66675H16.1417C17.7083 1.66675 18.3333 2.29175 18.3333 3.85008Z"
                  stroke={rightNavState === navItem.nav ? "#292D32" : "#AFAFAF"}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
          </Avatar>
          <Typography sx={{ fontSize: "12px" }}>{navItem.nav}</Typography>
        </Box>
      ))}
    </Box>
  );
};

RightNavbar.propTypes = {};

export default RightNavbar;
