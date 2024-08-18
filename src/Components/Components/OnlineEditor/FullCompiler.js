import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Box, Button, Grid } from "@mui/material";

const FullCompilor = () => {
  const [code, setCode] = useState(`
    const App = () => React.createElement('div', null, 'Hello, World!');
    module.exports = App;
  `);
  const [html, setHtml] = useState("");

  const sendCodeToServer = () => {
    fetch("http://localhost:4040/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    })
      .then((response) => response.text())
      .then((data) => setHtml(data))
      .catch((error) => console.error("Error sending code to server:", error));
  };

  return (
    <Grid
      container
      sx={{
        mt: "60px",
        display: "flex",
        flexGrow: "1",
        flexDirection: "row",
        border: "1px solid green",
      }}
    >
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          border: "1px solid red",
          overflow: "hidden",
        }}
      >
        <MonacoEditor
          height="60vh"
          language="javascript"
          value={code}
          onChange={(value) => setCode(value)}
          theme="vs-dark"
        />
        <Button
          variant="contained"
          onClick={sendCodeToServer}
          sx={{ marginTop: "16px" }}
        >
          Run Code
        </Button>
        <Box
          sx={{ marginTop: "16px", padding: "16px", border: "1px solid #ddd" }}
        >
          <h3>Output</h3>
          <iframe
            title="Output"
            srcDoc={html}
            style={{ width: "100%", height: "400px", border: "none" }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default FullCompilor;

// import React, { useState, useEffect, useRef } from "react";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import EditorComponent from "./MonacoEditor2";

// const FullCompiler = () => {
//   const [code, setCode] = useState(`
//     import React from 'react';

//     const Header = () => <header>Header Component</header>;
//     const Footer = () => <footer>Footer Component</footer>;
//     const App = () => (
//       <div>
//         <Header />
//         <main>Main Content</main>
//         <Footer />
//       </div>
//     );

//     export default App;
//   `);
//   const [html, setHtml] = useState("");

//   // WebSocket connection ref
//   const socketRef = useRef(null);

//   useEffect(() => {
//     // Erstelle eine WebSocket-Verbindung nur einmal
//     socketRef.current = new WebSocket("ws://localhost:4000/ws");

//     // Funktion zum Handhaben von Nachrichten
//     const handleMessage = (event) => {
//       setHtml(event.data);
//     };

//     if (socketRef.current) {
//       socketRef.current.onmessage = handleMessage;

//       // Aufräumen beim Entfernen des Komponenten
//       return () => {
//         if (socketRef.current) {
//           socketRef.current.close();
//           socketRef.current = null;
//         }
//       };
//     }
//   }, []);

//   // Handle code change and send new code to server
//   useEffect(() => {
//     if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
//       socketRef.current.send(code);
//     }
//   }, [code]);

//   return (
//     <Grid
//       container
//       sx={{
//         mt: "60px",
//         display: "flex",
//         flexGrow: "1",
//         flexDirection: "row",
//         border: "1px solid green",
//       }}
//     >
//       <Grid
//         item
//         xs={12}
//         md={12}
//         lg={12}
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           flexGrow: 1,
//           border: "1px solid red",
//           overflow: "hidden",
//         }}
//       >
//         <EditorComponent
//           height="60vh"
//           language="javascript"
//           value={code}
//           onChange={(value) => setCode(value)}
//           theme="vs-dark"
//         />
//         <Button variant="contained" sx={{ marginTop: "16px" }}>
//           Run Code
//         </Button>
//         <Box
//           sx={{ marginTop: "16px", padding: "16px", border: "1px solid #ddd" }}
//         >
//           <h3>Output</h3>
//           <iframe
//             title="Output"
//             srcDoc={html}
//             style={{ width: "100%", height: "400px", border: "none" }}
//           />
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

// export default FullCompiler;
