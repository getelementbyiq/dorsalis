import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Importiere das Standard-Styling für Quill
import { Box } from "@mui/material";
import "./style.css";

const GoogleDocs = (props) => {
  const [editorHtml, setEditorHtml] = useState("");

  const handleChange = (content, delta, source, editor) => {
    setEditorHtml(content);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        // maxHeight: "86vh",
        // overflowY: "auto",
        position: "relative",
        overflowX: "hidden",
        pr: "4px",
      }}
    >
      <ReactQuill
        value={editorHtml}
        onChange={handleChange}
        modules={GoogleDocs.modules}
        formats={GoogleDocs.formats}
        style={{ maxHeight: "92%", width: "100%", border: "none" }}
      />
    </Box>
  );
};

GoogleDocs.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: "3" }], // Header Levels
    [{ font: [] }], // Font Family
    [{ size: [] }], // Font Size
    [{ list: "ordered" }, { list: "bullet" }], // Lists
    ["bold", "italic", "underline", "strike"], // Text Format
    [{ script: "sub" }, { script: "super" }], // Subscript and Superscript
    [{ color: [] }, { background: [] }], // Text and Background Color
    [{ align: [] }], // Text Alignment
    ["link", "image", "video"], // Links, Images, Videos
    ["blockquote", "code-block"], // Blockquotes and Code Blocks
    ["clean"], // Remove Formatting
  ],
};

GoogleDocs.formats = [
  "header",
  "font",
  "size",
  "list",
  "bullet",
  "bold",
  "italic",
  "underline",
  "strike",
  "script",
  "color",
  "background",
  "align",
  "link",
  "image",
  "video",
  "blockquote",
  "code-block",
];
GoogleDocs.propTypes = {};

export default GoogleDocs;
