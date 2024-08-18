import React from "react";
import { Tooltip, Typography, Box } from "@mui/material";

const LinkWithTooltip = ({ link, displayLink }) => {
  return (
    <Tooltip
      title={
        <Box
          component="iframe"
          src={link}
          sx={{
            width: 500,
            height: 300,
            border: "none",
          }}
          title="Preview"
        />
      }
      arrow
    >
      <Typography
        variant="body2"
        color="primary"
        component="a"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {displayLink}
      </Typography>
    </Tooltip>
  );
};

export default LinkWithTooltip;
