import React, { useState, useEffect, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const ColorTabs = () => {
  const [value, setValue] = useState("one");
  const [html, setHtml] = useState('<p id="content">Hello World</p>');
  const [css, setCss] = useState("p { color: red; }");
  const [js, setJs] = useState(`
    document.getElementById('content').innerText = 'Updated by JavaScript!';
  `);
  const iframeRef = useRef(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateIframe = () => {
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}<\/script>
      </body>
      </html>
    `);
    doc.close();
  };

  useEffect(() => {
    if (value === "four") {
      updateIframe();
    }
  }, [html, css, js, value]);

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
        <Tab value="one" label="HTML" />
        <Tab value="two" label="CSS" />
        <Tab value="three" label="JavaScript" />
        <Tab value="four" label="Preview" />
      </Tabs>
      <Box sx={{ p: 2 }}>
        {value === "one" && (
          <MonacoEditor
            height="68vh"
            language="html"
            value={html}
            onChange={(value) => setHtml(value)}
          />
        )}
        {value === "two" && (
          <MonacoEditor
            height="68vh"
            language="css"
            value={css}
            onChange={(value) => setCss(value)}
          />
        )}
        {value === "three" && (
          <MonacoEditor
            height="68vh"
            language="javascript"
            value={js}
            onChange={(value) => setJs(value)}
          />
        )}
        {value === "four" && (
          <Box>
            <iframe
              ref={iframeRef}
              style={{
                width: "100%",
                height: "68vh",
                border: "1px solid black",
              }}
              title="Preview"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ColorTabs;
