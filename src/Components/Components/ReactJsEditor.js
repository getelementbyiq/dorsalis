// import React, { useState, useEffect, useRef } from "react";
// import MonacoEditor from "@monaco-editor/react";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";
// import * as Babel from "@babel/standalone";
// import "./styles.css";

// const ReactPreview = () => {
//   const [value, setValue] = useState("one");
//   const [code, setCode] = useState(`
//     const App = () => <div>Hello, React!</div>;
//     ReactDOM.render(<App />, document.getElementById('root'));
//   `);
//   const iframeRef = useRef(null);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const updateIframe = () => {
//     const iframe = iframeRef.current;
//     const doc = iframe.contentDocument || iframe.contentWindow.document;

//     const transformedCode = Babel.transform(code, { presets: ["react"] }).code;

//     doc.open();
//     doc.write(`
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>React Preview</title>
//         <script src="https://unpkg.com/react/umd/react.development.js"></script>
//         <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
//       </head>
//       <body>
//         <div id="root"></div>
//         <script>
//           ${transformedCode}
//         </script>
//       </body>
//       </html>
//     `);
//     doc.close();
//   };

//   useEffect(() => {
//     if (value === "four") {
//       updateIframe();
//     }
//   }, [code, value]);

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Tabs
//         value={value}
//         onChange={handleChange}
//         textColor="secondary"
//         indicatorColor="secondary"
//         aria-label="secondary tabs example"
//         centered
//       >
//         <Tab value="one" label="Code" />
//         <Tab value="four" label="Preview" />
//       </Tabs>
//       <Box sx={{ p: 2, borderRadius: "16px", overflow: "hidden" }}>
//         {value === "one" && (
//           <MonacoEditor
//             height="68vh"
//             borderRadius="16px"
//             language="javascript"
//             value={code}
//             onChange={(value) => setCode(value)}
//             options={{
//               roundedSelection: true,
//               scrollBeyondLastLine: false,
//               readOnly: false,
//               fontSize: 14,
//             }}
//             style={{
//               borderRadius: "16px",
//               border: "1px solid #ddd", // Example border
//             }}
//           />
//         )}
//         {value === "four" && (
//           <Box>
//             <iframe
//               ref={iframeRef}
//               style={{
//                 background: "#fff",
//                 width: "100%",
//                 height: "68vh",
//                 border: "none",
//                 borderRadius: "16px",
//                 padding: "0",
//                 boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
//               }}
//               title="React Preview"
//             />
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default ReactPreview;

// import React, { useState, useRef } from "react";
// import MonacoEditor from "@monaco-editor/react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import axios from "axios";
// import "./styles.css";
// import { Grid, Typography } from "@mui/material";
// import { UserAuth } from "../../app/Auth";

// const FileTab = ({ fileName, onClose }) => (
//   <Box
//     sx={{
//       display: "flex",
//       alignItems: "center",
//       gap: "6px",
//       borderRadius: "16px 16px 16px 0px",
//       background: "#000",
//       pl: "8px",
//     }}
//   >
//     <Box
//       sx={{
//         flexGrow: 1,
//         color: "#fff",
//       }}
//     >
//       <Typography
//         sx={{
//           fontSize: "12px",
//           //   border: "1px solid green",
//         }}
//       >
//         {fileName}
//       </Typography>
//     </Box>
//     <Box
//       onClick={() => onClose(fileName)}
//       sx={{
//         // border: "1px solid red",
//         transform: "rotate(45deg)",
//         borderRadius: "50%",
//         width: "24px",
//         height: "24px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <svg
//         width="14"
//         height="14"
//         viewBox="0 0 14 14"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M3.5 7H10.5"
//           stroke="#fff"
//           stroke-width="1.5"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//         />
//         <path
//           d="M7 10.5V3.5"
//           stroke="#fff"
//           stroke-width="1.5"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//         />
//       </svg>
//     </Box>
//   </Box>
// );

// const ReactPreview = () => {
//   const [files, setFiles] = useState({
//     "index.js": `
//       import { Card } from './anotherFile.js';
//       const App = () => (
//         <div>
//           Hello, React!
//           <Card />
//         </div>
//       );
//       ReactDOM.render(<App />, document.getElementById('root'));
//     `,
//     "anotherFile.js": `
//       console.log('This is another file');
//       export const Card = () => {
//         return (
//           <div>
//             Test
//           </div>
//         );
//       };
//     `,
//   });
//   const [openFiles, setOpenFiles] = useState(["index.js"]);
//   const [currentFile, setCurrentFile] = useState("index.js");
//   const [output, setOutput] = useState("");
//   const iframeRef = useRef(null);
//   const { user } = UserAuth();
//   const useId = user.uid;

//   const handleEditorChange = (value, fileName) => {
//     setFiles((prevFiles) => ({
//       ...prevFiles,
//       [fileName]: value,
//     }));
//   };

//   const openFile = (fileName) => {
//     if (!openFiles.includes(fileName)) {
//       setOpenFiles([...openFiles, fileName]);
//     }
//     setCurrentFile(fileName);
//   };

//   const closeFile = (fileName) => {
//     const newOpenFiles = openFiles.filter((file) => file !== fileName);
//     setOpenFiles(newOpenFiles);
//     if (fileName === currentFile && newOpenFiles.length > 0) {
//       setCurrentFile(newOpenFiles[0]);
//     } else if (newOpenFiles.length === 0) {
//       setCurrentFile("");
//     }
//   };

//   return (
//     <Grid
//       container
//       sx={{
//         mt: "60px",
//         display: "flex",
//         flexGrow: "1",
//         flexDirection: "row",
//         border: "1px solid green", // Ensure the container uses full viewport width
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
//         <Box sx={{ display: "flex", borderBottom: "1px solid #ddd" }}>
//           <Box>
//             {openFiles.map((fileName) => (
//               <FileTab key={fileName} fileName={fileName} onClose={closeFile} />
//             ))}
//           </Box>
//           <Button
//             variant="contained"
//             onClick={"runCode"}
//             sx={{ marginLeft: "auto" }}
//           >
//             Run Code
//           </Button>
//         </Box>
//         {currentFile && (
//           <Box
//             sx={{
//               flexGrow: 1,
//               borderRadius: "16px",
//               overflow: "hidden",
//               height: "70%",
//               justifyContent: "center",
//               border: "1px solid red",
//             }}
//           >
//             <MonacoEditor
//               height="68vh"
//               language="javascript"
//               value={files[currentFile]}
//               onChange={(value) => handleEditorChange(value, currentFile)}
//               theme="vs-dark"
//               options={{
//                 roundedSelection: true,
//                 scrollBeyondLastLine: false,
//                 readOnly: false,
//                 fontSize: 14,
//               }}
//               style={{
//                 borderRadius: "16px",
//                 border: "1px solid #ddd", // Example border
//               }} // Use full width and height of the container
//             />
//           </Box>
//         )}
//       </Grid>
//       <Grid
//         item
//         xs={12}
//         md={12}
//         lg={12}
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           borderTop: "1px solid #ddd",
//           backgroundColor: "#f1f1f1",
//         }}
//       >
//         <Box
//           sx={{
//             padding: "8px",
//             borderBottom: "1px solid #ddd",
//             fontWeight: "bold",
//           }}
//         >
//           Console
//         </Box>
//         <Box
//           sx={{
//             flexGrow: 1,
//             padding: "8px",
//             overflowY: "auto",
//             whiteSpace: "pre-wrap",
//           }}
//         >
//           <pre>{output}</pre>
//         </Box>
//         <iframe
//           title="Preview"
//           //   ref={iframeRef}
//           sandbox="allow-scripts"
//           style={{ width: "100%", height: "200px", border: "none" }}
//         />
//       </Grid>
//     </Grid>
//   );
// };

// export default ReactPreview;

import React, { useState, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import "./styles.css";
import { Grid } from "@mui/material";
import { UserAuth } from "../../app/Auth";

// Komponente für die Dateitabs
const FileTab = ({ fileName, onClose, onClick }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      borderRadius: "16px 16px 16px 0px",
      background: "#000",
      pl: "8px",
      cursor: "pointer", // Zeigt, dass es anklickbar ist
    }}
    onClick={() => onClick(fileName)} // Fügt Klick-Handler hinzu
  >
    <Box
      sx={{
        flexGrow: 1,
        color: "#fff",
      }}
    >
      <Typography
        sx={{
          fontSize: "12px",
        }}
      >
        {fileName}
      </Typography>
    </Box>
    <Box
      onClick={(e) => {
        e.stopPropagation(); // Verhindert, dass das Schließen des Tabs das Klicken auf den Tab auslöst
        onClose(fileName);
      }}
      sx={{
        transform: "rotate(45deg)",
        borderRadius: "50%",
        width: "24px",
        height: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.5 7H10.5"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 10.5V3.5"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  </Box>
);

const ReactPreview = () => {
  const [files, setFiles] = useState({
    "index.js": `
      import { Card } from './anotherFile.js';
      const App = () => (
        <div>
          Hello, React!
          <Card />
        </div>
      );
      ReactDOM.render(<App />, document.getElementById('root'));
    `,
    "anotherFile.js": `
      console.log('This is another file');
      export const Card = () => {
        return (
          <div>
            Test
          </div>
        );
      };
    `,
  });

  const [openFiles, setOpenFiles] = useState(["index.js"]);
  const [currentFile, setCurrentFile] = useState("index.js");
  const [output, setOutput] = useState("");
  const iframeRef = useRef(null);
  const { user } = UserAuth();
  const useId = user.uid;

  const handleEditorChange = (value, fileName) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [fileName]: value,
    }));
  };

  const openFile = (fileName) => {
    if (!openFiles.includes(fileName)) {
      setOpenFiles([...openFiles, fileName]);
    }
    setCurrentFile(fileName);
  };

  const closeFile = (fileName) => {
    const newOpenFiles = openFiles.filter((file) => file !== fileName);
    setOpenFiles(newOpenFiles);
    if (fileName === currentFile && newOpenFiles.length > 0) {
      setCurrentFile(newOpenFiles[0]);
    } else if (newOpenFiles.length === 0) {
      setCurrentFile("");
    }
  };

  const createNewFile = (fileName) => {
    if (!files[fileName]) {
      setFiles((prevFiles) => ({
        ...prevFiles,
        [fileName]: "",
      }));
      setOpenFiles([...openFiles, fileName]);
      setCurrentFile(fileName);
    } else {
      setCurrentFile(fileName);
    }
  };

  const runCode = async () => {
    try {
      const result = await axios.post("/api/run", { files });
      setOutput(result.data.stdout + result.data.stderr);
    } catch (error) {
      console.error("Error running code:", error);
      setOutput("Error running code");
    }
  };

  return (
    <Grid
      container
      sx={{
        mt: "60px",
        display: "flex",
        flexGrow: "1",
        flexDirection: "row",
        border: "1px solid green", // Ensure the container uses full viewport width
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
        <Box sx={{ display: "flex", borderBottom: "1px solid #ddd" }}>
          <Box>
            {openFiles.map((fileName) => (
              <FileTab
                key={fileName}
                fileName={fileName}
                onClose={closeFile}
                onClick={openFile} // Updated to handle file opening
              />
            ))}
          </Box>
          <Button
            variant="contained"
            onClick={runCode} // Updated to function call
            sx={{ marginLeft: "auto" }}
          >
            Run Code
          </Button>
        </Box>
        {currentFile && (
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
              height="68vh"
              language="javascript"
              value={files[currentFile]}
              onChange={(value) => handleEditorChange(value, currentFile)}
              theme="vs-dark"
              options={{
                roundedSelection: true,
                scrollBeyondLastLine: false,
                readOnly: false,
                fontSize: 14,
              }}
              style={{
                borderRadius: "16px",
                border: "1px solid #ddd", // Example border
              }} // Use full width and height of the container
            />
          </Box>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          borderTop: "1px solid #ddd",
          backgroundColor: "#f1f1f1",
        }}
      >
        <Box
          sx={{
            padding: "8px",
            borderBottom: "1px solid #ddd",
            fontWeight: "bold",
          }}
        >
          Console
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            padding: "8px",
            overflowY: "auto",
            whiteSpace: "pre-wrap",
          }}
        >
          <pre>{output}</pre>
        </Box>
        <iframe
          title="Preview"
          ref={iframeRef}
          sandbox="allow-scripts"
          style={{ width: "100%", height: "200px", border: "none" }}
        />
      </Grid>
    </Grid>
  );
};

export default ReactPreview;
