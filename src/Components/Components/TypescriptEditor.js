import React, { useState, useEffect, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import * as Babel from "@babel/standalone";

const CodeEditor = () => {
  const [value, setValue] = useState("one");
  const [code, setCode] = useState(`
    import React from 'react';
    import ReactDOM from 'react-dom';
    
    const App = () => <div>Hello, React with TypeScript!</div>;
    ReactDOM.render(<App />, document.getElementById('root'));
  `);
  const iframeRef = useRef(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateIframe = () => {
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;

    const transformedCode = Babel.transform(code, {
      presets: ["react"],
      plugins: ["@babel/plugin-transform-typescript"],
    }).code;

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React Preview</title>
        <script src="https://unpkg.com/react/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
      </head>
      <body>
        <div id="root"></div>
        <script>
          ${transformedCode}
        </script>
      </body>
      </html>
    `);
    doc.close();
  };

  useEffect(() => {
    if (value === "four") {
      updateIframe();
    }
  }, [code, value]);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        centered
      >
        <Tab value="one" label="Code" />
        <Tab value="four" label="Preview" />
      </Tabs>
      <Box sx={{ p: 2 }}>
        {value === "one" && (
          <MonacoEditor
            height="300px"
            language="typescript"
            value={code}
            onChange={(value) => setCode(value)}
            options={{
              roundedSelection: true,
              scrollBeyondLastLine: false,
              readOnly: false,
              fontSize: 14,
            }}
            style={{
              borderRadius: "16px",
              border: "1px solid #ddd", // Example border
            }}
          />
        )}
        {value === "four" && (
          <Box>
            <iframe
              ref={iframeRef}
              style={{
                width: "100%",
                height: "500px",
                border: "none",
                borderRadius: "16px",
                padding: "0",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
              }}
              title="React Preview"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CodeEditor;
