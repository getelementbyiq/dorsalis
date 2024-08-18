import React, { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Box, Button } from "@mui/material";

const EditorComponent = ({ language, value, onChange }) => {
  const [code, setCode] = useState("");
  const [html, setHtml] = useState("");

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const runCode = async () => {
    try {
      const response = await fetch("/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const html = await response.text();
      setHtml(html);
    } catch (error) {
      console.error("Error running code:", error);
    }
  };

  useEffect(() => {
    const eventSource = new EventSource("/sse");

    eventSource.onmessage = (event) => {
      const html = JSON.parse(event.data);
      setHtml(html);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        borderRadius: "16px",
        overflow: "hidden",
        height: "70%",
        justifyContent: "center",
        border: "1px solid red",
      }}
    >
      <MonacoEditor
        height="90vh"
        language={language}
        value={code}
        onChange={handleCodeChange}
        theme="vs-dark"
        options={{
          roundedSelection: true,
          scrollBeyondLastLine: false,
          readOnly: false,
          fontSize: 14,
        }}
      />
      <Button onClick={runCode}>Run Code</Button>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Box>
  );
};

export default EditorComponent;
