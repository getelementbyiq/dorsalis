import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another
import { Box } from "@mui/material";

function TextEditor() {
  const [code, setCode] = React.useState(
    `This is sample Note
    function add(a, b) {\n  return a + b;\n}`
  );
  return (
    <Box
      sx={{
        display: "flex",
        background: "#fff",
        borderRadius: "4px",
        mx: "4px",
      }}
    >
      <Editor
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
    </Box>
  );
}

export default TextEditor;
