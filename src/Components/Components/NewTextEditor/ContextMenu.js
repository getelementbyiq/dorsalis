import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const ContextMenu = ({ anchorEl, onClose }) => {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
      <MenuItem onClick={() => onClose()}>Option 1</MenuItem>
      <MenuItem onClick={() => onClose()}>Option 2</MenuItem>
      <MenuItem onClick={() => onClose()}>Option 3</MenuItem>
    </Menu>
  );
};

export default ContextMenu;
