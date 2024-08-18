import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Box, Typography } from "@mui/material";

export default function CodeEditor(props) {
  const { language, displayName, value, onChange } = props;
  const [open, setOpen] = useState(true);
  const monacoRef = useRef(null);

  function handleCodeChange(value) {
    onChange(value);
  }

  const handleEditorDidMount = (editor, monaco) => {
    monacoRef.current = editor;

    const myCommandId = editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S,
      () => {
        // Logik für den Befehl
        alert("Speichern-Befehl wurde ausgeführt!");
      }
    );
    editor.addAction({
      id: "my-custom-command",
      label: "Speichern",
      contextMenuGroupId: "navigation", // Gruppe im Kontextmenü
      contextMenuOrder: 1, // Position in der Gruppe
      run: function (ed) {
        // Logik für den Kontextmenüeintrag
        editor.trigger(null, myCommandId, null);
      },
    });
    // Format the document after the editor is mounted
    setTimeout(() => {
      const action = editor.getAction("editor.action.formatDocument");
      if (action) {
        const formattingOptions = {
          insertSpaces: true, // Use spaces instead of tabs
          tabSize: 2, // Number of spaces per tab
        };
        action
          .run()
          .then(() => {
            console.log("Document formatted");
          })
          .catch((err) => {
            console.error("Formatting failed:", err);
          });
      } else {
        console.error("Format Document action not found");
      }
    }, 1000); // Wait for the editor to be fully initialized
  };

  return (
    <Box
      className={`editor-container ${open ? "" : "collapsed"}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        flexGrow: "1",
        background: "#1E1E1E",
      }}
    >
      <Box
        sx={{
          display: "flex",
          //   border: "1px solid red",
          justifyConten: "flex-end",
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            color: "#fff",
          }}
        >
          {displayName}
        </Typography>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          justifyContent: "center",
          height: "53vh",
        }}
      >
        <Editor
          height="55vh"
          language={language}
          value={value}
          onChange={(value) => handleCodeChange(value)}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{
            roundedSelection: true,
            scrollBeyondLastLine: false,
            readOnly: false,
            fontSize: 12,
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </Box>
    </Box>
  );
}
