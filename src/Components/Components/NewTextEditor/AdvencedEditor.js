import React, { useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  Modifier,
} from "draft-js";
import "draft-js/dist/Draft.css";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

const CustomTextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [anchorEl, setAnchorEl] = useState(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (state) => {
    setEditorState(state);
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 66 /* B */ && e.metaKey) {
      return "bold";
    }
    if (e.keyCode === 73 /* I */ && e.metaKey) {
      return "italic";
    }
    if (e.keyCode === 85 /* U */ && e.metaKey) {
      return "underline";
    }
    return getDefaultKeyBinding(e);
  };

  const toggleInlineStyle = (style) => {
    handleChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  const insertImage = () => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "IMAGE",
      "IMMUTABLE",
      { src: imageUrl }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newContentState = Modifier.insertText(
      contentStateWithEntity,
      editorState.getSelection(),
      " ",
      null,
      entityKey
    );
    handleChange(
      EditorState.push(editorState, newContentState, "insert-characters")
    );
    setImageUrl("");
    setAnchorEl(null);
  };

  const addLink = () => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url: linkUrl }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newContentState = Modifier.applyEntity(
      contentStateWithEntity,
      editorState.getSelection(),
      entityKey
    );
    handleChange(
      EditorState.push(editorState, newContentState, "apply-entity")
    );
    setLinkUrl("");
    setAnchorEl(null);
  };

  return (
    <Box style={{ padding: "16px" }}>
      <Box mb={2}>
        <IconButton onClick={() => toggleInlineStyle("BOLD")}>
          <FormatBoldIcon />
        </IconButton>
        <IconButton onClick={() => toggleInlineStyle("ITALIC")}>
          <FormatItalicIcon />
        </IconButton>
        <IconButton onClick={() => toggleInlineStyle("UNDERLINE")}>
          <FormatUnderlinedIcon />
        </IconButton>
        <IconButton onClick={() => toggleInlineStyle("ordered-list-item")}>
          <FormatListNumberedIcon />
        </IconButton>
        <IconButton onClick={() => toggleInlineStyle("unordered-list-item")}>
          <FormatListBulletedIcon />
        </IconButton>
        <IconButton onClick={() => setAnchorEl("image")}>
          <InsertPhotoIcon />
        </IconButton>
        <IconButton onClick={() => setAnchorEl("link")}>
          <InsertLinkIcon />
        </IconButton>
        <IconButton
          onClick={() => setEditorState(EditorState.undo(editorState))}
        >
          <UndoIcon />
        </IconButton>
        <IconButton
          onClick={() => setEditorState(EditorState.redo(editorState))}
        >
          <RedoIcon />
        </IconButton>
      </Box>
      <div style={{ border: "1px solid #ccc", minHeight: "400px" }}>
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={handleChange}
          placeholder="Start typing your document here..."
        />
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {anchorEl === "image" && (
          <>
            <MenuItem>
              <TextField
                label="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                fullWidth
              />
            </MenuItem>
            <MenuItem onClick={insertImage}>Insert Image</MenuItem>
          </>
        )}
        {anchorEl === "link" && (
          <>
            <MenuItem>
              <TextField
                label="Link URL"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                fullWidth
              />
            </MenuItem>
            <MenuItem onClick={addLink}>Add Link</MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
};

export default CustomTextEditor;
