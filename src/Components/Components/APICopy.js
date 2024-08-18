import React, { useState } from "react";
import { IconButton, InputBase, Paper, Tooltip } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { UserAuth } from "../../app/Auth";

const CopyablePasswordField = () => {
  const { user } = UserAuth();
  const [copied, setCopied] = useState(false);
  const [password, setPasswor] = useState(user.uid);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        value={password}
        type="password"
        sx={{ ml: 1, flex: 1 }}
        readOnly
        inputProps={{ "aria-label": "password" }} // Make sure it's selectable
      />
      <Tooltip title={copied ? "Copied!" : "Copy"} arrow>
        <CopyToClipboard text={password} onCopy={handleCopy}>
          <IconButton sx={{ p: "10px" }} aria-label="copy">
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
        </CopyToClipboard>
      </Tooltip>
    </Paper>
  );
};

export default CopyablePasswordField;
