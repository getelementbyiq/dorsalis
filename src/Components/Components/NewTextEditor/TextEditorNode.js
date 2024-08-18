import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Importiere die Quill-Stile

// Breite und Höhe für A4 Papier (in Pixeln)
const A4_WIDTH = 210;
const A4_HEIGHT = 297;

const TextEditorNode = ({ data }) => {
  const [editorValue, setEditorValue] = React.useState(data.text || "");

  const handleChange = (value) => {
    setEditorValue(value);
    data.onChange(value); // Informiere den Flow über Änderungen
  };

  return (
    <div
      style={{
        width: `${A4_WIDTH}px`,
        height: `${A4_HEIGHT}px`,
        padding: 10,
        border: "1px solid black",
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
        boxSizing: "border-box",
        overflow: "hidden",
        backgroundColor: "#fff",
      }}
    >
      <ReactQuill
        value={editorValue}
        onChange={handleChange}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          padding: 0,
          margin: 0,
        }}
      />
    </div>
  );
};

export default TextEditorNode;
