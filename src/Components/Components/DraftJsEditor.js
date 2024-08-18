import React, { useEffect, useState } from "react";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import { Box, Button, ButtonGroup, IconButton } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import CodeIcon from "@mui/icons-material/Code";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import { UserAuth } from "../../app/Auth";
import { useDispatch, useSelector } from "react-redux";
import { uploadNote } from "../../app/Slices/createData";
import { collection, getDocs, query } from "firebase/firestore";

const TextEditorDraft = () => {
  const { user } = UserAuth();
  const globalState = useSelector((state) => state.globalStates);
  const { mainNav, subNav } = globalState;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();
  console.log("value", value);

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  console.log("editorState", editorState);
  const getEditorValue = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    console.log(JSON.stringify(rawContent, null, 2));
    const value = JSON.stringify(rawContent, null, 2);
    dispatch(uploadNote({ docName: "notes", user: user, data: value }));
  };

  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        borderRadius: "4px",
        padding: "4px",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <ButtonGroup
        size="small" // Smaller size
        aria-label="outlined primary button group"
        // style={{ background: "green" }}
      >
        <IconButton onClick={() => toggleInlineStyle("BOLD")} size="small">
          <FormatBoldIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={() => toggleInlineStyle("ITALIC")} size="small">
          <FormatItalicIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={() => toggleInlineStyle("UNDERLINE")} size="small">
          <FormatUnderlinedIcon fontSize="small" />
        </IconButton>

        <IconButton
          onClick={() => toggleBlockType("ordered-list-item")}
          size="small"
        >
          <FormatListNumberedIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={() => toggleBlockType("code-block")} size="small">
          <CodeIcon fontSize="small" />
        </IconButton>
      </ButtonGroup>
      <Box
        sx={{
          marginTop: "8px",
          backgroundColor: "rgba(0,0,0,0.1)",
          borderRadius: "4px",
          p: "4px",
          maxHeight: "56vh",
          overflow: "auto",
        }}
      >
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={setEditorState}
          placeholder="Write your note"
        />
      </Box>
      <Button
        variant="contained"
        onClick={getEditorValue}
        sx={{ marginTop: "16px" }}
      >
        Save
      </Button>
    </Box>
  );
};

export default TextEditorDraft;
