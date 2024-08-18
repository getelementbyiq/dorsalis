import React from "react";
import { Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const FileTab = ({ fileName, onClose }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        background: "#000",
        color: "#fff",
        padding: "4px",
      }}
    >
      <Typography>{fileName}</Typography>
      <CloseIcon
        onClick={() => onClose(fileName)}
        sx={{ cursor: "pointer", color: "#fff" }}
      />
    </Box>
  );
};

export default FileTab;
