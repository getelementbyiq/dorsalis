import React, { useState, useEffect } from "react";
import Editor from "./Editor20";
import useLocalStorage from "./useLocalStorage";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import { model } from "../../../firebase";
import { loadGoogleFont } from "../../Functions/GoogleFonts";

function Collector() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");
  const [tab, setTab] = useState("Preview");
  const tabs = ["Preview", "<HTML>", "CSS", "JS"];
  const [prompt, setPrompt] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState();
  const [colorPalateCreated, setColorPalateCreated] = useState();
  const [font, setFont] = useState();
  const [imageSrc, setImageSrc] = useState("");
  const [consoleLoad, setConsoleLoad] = useState(["Start to promt"]);
  const [loading, setLoading] = useState();
  const [consoleOut, setConsoleOut] = useState([]);
  console.log("colorPalateCreated", colorPalateCreated);
  console.log("font", font);

  const handleTab = (txt) => {
    setTab(txt);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const handleChange = (event) => {
    setPrompt(event.target.value);
  };
  //   async function runWriteCodes(prompt) {
  //     let htmlCode = "";
  //     let cssCode = "";

  //     // HTML-Generierung
  //     const htmlResult = await model.generateContentStream(
  //       prompt + " Generiere HTML-Struktur..."
  //     );

  //     for await (const chunk of htmlResult.stream) {
  //       htmlCode += chunk.text().trim();
  //     }

  //     // CSS-Generierung (unter Verwendung des generierten HTML)
  //     const cssResult = await model.generateContentStream(
  //       prompt + " Generiere CSS-Styles für den HTML-Code..." + htmlCode
  //     );

  //     for await (const chunk of cssResult.stream) {
  //       cssCode += chunk.text().trim();
  //     }

  //     // JavaScript-Generierung (unter Verwendung von HTML und CSS)
  //     const jsResult = await model.generateContentStream(
  //       prompt +
  //         " Generiere JavaScript-Code für dynamisches Verhalten..." +
  //         htmlCode +
  //         cssCode
  //     );

  //     for await (const chunk of jsResult.stream) {
  //       const jsCode = chunk.text().trim();
  //       // Sie können den generierten Code für HTML, CSS und JavaScript hier zurückgeben
  //       // oder an die aufrufende Funktion weiterleiten.
  //       console.log("HTML-Code:", htmlCode);
  //       console.log("CSS-Code:", cssCode);
  //       console.log("JavaScript-Code:", jsCode);

  //       // Rückgabebeispiel für die aufrufende Funktion
  //       return { html: htmlCode, css: cssCode, js: jsCode };
  //     }
  //   }
  //   async function runWriteCodes(prompt) {
  //     let htmlCode = "";
  //     let cssCode = "";

  //     // HTML-Generierung
  //     const htmlResult = await model.generateContentStream(
  //       prompt + " Generate HTML structure..."
  //     );

  //     for await (const chunk of htmlResult.stream) {
  //       htmlCode += chunk.text().trim();
  //     }

  //     // CSS-Generierung (unter Verwendung des generierten HTML)
  //     const cssResult = await model.generateContentStream(
  //       prompt + " Generate CSS styles for the HTML code..." + htmlCode
  //     );

  //     for await (const chunk of cssResult.stream) {
  //       cssCode += chunk.text().trim();
  //     }

  //     // JavaScript-Generierung (unter Verwendung von HTML und CSS)
  //     const jsResult = await model.generateContentStream(
  //       prompt +
  //         " Generate JavaScript code for dynamic behavior..." +
  //         htmlCode +
  //         cssCode
  //     );

  //     for await (const chunk of jsResult.stream) {
  //       const jsCode = chunk.text().trim();
  //       // Sie können den generierten Code für HTML, CSS und JavaScript hier zurückgeben
  //       // oder an die aufrufende Funktion weiterleiten.
  //       console.log("HTML-Code:", htmlCode);
  //       console.log("CSS-Code:", cssCode);
  //       console.log("JavaScript-Code:", jsCode);

  //       setHtml(htmlCode);
  //       setCss(cssCode);
  //       setJs(jsCode);

  //       // Rückgabebeispiel für die aufrufende Funktion
  //       return { html: htmlCode, css: cssCode, js: jsCode };
  //     }
  //   }

  async function runWriteCodes(prompt) {
    const pauseTime = 3000; // Adjust pause time as needed (in milliseconds)
    // const fontRec = fontRecognizing(prompt);
    // let fontForProject;
    // if (font) {
    //   fontForProject = loadGoogleFont(font);
    // }
    // await new Promise((resolve) => setTimeout(resolve, 6000));
    setConsoleLoad([
      ...consoleLoad,
      "/geminiAPI/start: understanding of promt",
    ]);

    const htmlPrompt = `Generate a Modern and creative HTML exactly structure for HTML CODE for ${prompt}. Include all the essential HTML tags and structure and use from this fonts, for primery,secondary, and accent font.`;
    const htmlCode = await generateHTML(htmlPrompt);
    if (!htmlCode) {
      setLoading(loading + "-");
    } else {
      setLoading();
    }
    setConsoleLoad([...consoleLoad, "/geminiAPI/start: HTML code generated"]);

    console.log("htmlCode", htmlCode);
    console.log("start 1");
    // await new Promise((resolve) => setTimeout(resolve, pauseTime));
    setConsoleLoad([
      ...consoleLoad,
      "/geminiAPI/start: CSS requirements recognizing",
    ]);

    // const colorPalate = generateColorPalate(prompt);
    // console.log("colorPalate", colorPalate);
    // console.log("start 2");
    setLoading(loading + "-");

    const pauseTime2 = 6000; // Adjust pause time as needed (in milliseconds)

    await new Promise((resolve) => setTimeout(resolve, pauseTime2));
    console.log("start 3");

    // CSS-Generierung (fokussiert auf Layout und grundlegende Styling)
    const cssPrompt = `Create modern and creative-colorfull CSS styles for the following HTML: ${htmlCode} and based what is written under point CSS: ${prompt}. Focus on modern layout, and design like in this color palate:-for primery, secondary, and accent color, and structure.`;
    const cssCode = await generateCSS(cssPrompt);
    if (!cssCode) {
      setLoading(loading + "-");
    } else {
      setLoading();
    }
    setConsoleLoad([...consoleLoad, "/geminiAPI/start: CSS code generated"]);

    setConsoleLoad([
      ...consoleLoad,
      "/geminiAPI/start: JS requirements recognizing",
    ]);

    await new Promise((resolve) => setTimeout(resolve, 10000));
    console.log("start 4");

    // // JavaScript-Generierung (fokussiert auf dynamische Elemente)
    const jsPrompt = `Write JavaScript code for this HTML ${htmlCode}, with CSS ${cssCode}, based on what is under Js: ${prompt} to enhance the following HTML structure with dynamic behavior. Consider adding features like: interactive elements, data fetching, animations.`;
    const jsCode = await generateJS(jsPrompt);
    console.log("start 5");
    if (!jsCode) {
      setLoading(loading + "-");
    } else {
      setLoading();
    }
    setConsoleLoad([...consoleLoad, "/geminiAPI/start: JS  code generated"]);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setConsoleLoad([
      ...consoleLoad,
      "/geminiAPI/start: promt processing is DONE!",
    ]);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setConsoleLoad([
      ...consoleLoad,
      "/geminiAPI/start: you can directly change the code, or you can write promt to specific things, and press 'Enter.",
    ]);

    // return { html: htmlCode, css: cssCode, js: jsCode };
    return;
  }

  async function generatePromt(prompt) {
    // Prompt wird um HTML-spezifische Anweisung erweitert
    let htmlCode = "";
    const generatePromtResult = await model.generateContentStream(
      prompt +
        " Generate exact promt what is needed for HTML..., CSS... and Js:..."
    );

    for await (const chunk of generatePromtResult.stream) {
      htmlCode += chunk.text().trim();
    }
    // ... (Rest der HTML-Generierung wie in der vorherigen Antwort)
    setGeneratedPrompt(htmlCode);
    return htmlCode;
  }
  async function fontRecognizing(prompt) {
    // Prompt wird um HTML-spezifische Anweisung erweitert
    let recognizedFont = "";
    const recognizeTheFontOfPromt = await model.generateContentStream(
      `Recognize modern fonts for this Prompt: ${prompt} , response just Primary Fonts, Secondary Fonts, Accent Fonts`
    );

    for await (const chunk of recognizeTheFontOfPromt.stream) {
      recognizedFont += chunk.text().trim();
    }
    // ... (Rest der HTML-Generierung wie in der vorherigen Antwort)
    setFont(recognizedFont);
    return recognizedFont;
  }
  async function generateColorPalate(prompt) {
    // Prompt wird um HTML-spezifische Anweisung erweitert
    let colorPalate = "";
    const generatePromtResult = await model.generateContentStream(
      prompt +
        " Generate modern colorPalate, response just Primary Colors, Secondary Colors, Accent Colors"
    );

    for await (const chunk of generatePromtResult.stream) {
      colorPalate += chunk.text().trim();
    }
    // ... (Rest der HTML-Generierung wie in der vorherigen Antwort)
    setColorPalateCreated(colorPalate);
    return colorPalate;
  }

  async function generateHTML(prompt) {
    // Prompt wird um HTML-spezifische Anweisung erweitert
    let htmlCode = "";
    const htmlResult = await model.generateContentStream(
      prompt +
        `response just JSON object of HTML {html:...}, use this tags wich in this CSS:${css}, and class-names like on this JS:${js}.
        requirement: RESPONSE JUST {html:...}
        `
    );

    for await (const chunk of htmlResult.stream) {
      htmlCode += chunk.text().trim();
    }

    console.log("htmlChunk", htmlCode);
    try {
      const cleanResponse = htmlCode
        .replace(/(\r\n|\n|\r)/gm, "") // Remove newlines
        .replace(/\s{2,}/g, " ") // Remove extra spaces
        .replace(/,(\s*])/, "]"); // Remove trailing commas
      // Parse das JSON
      const parsedHTML = JSON.parse(cleanResponse);
      console.log("parsedHTML", parsedHTML);
      // Extrahiere den Wert des "html"-Schlüssels
      //   const htmlContent = parsedHTML.html;
      // Setze das HTML
      setHtml(parsedHTML.html);

      return parsedHTML;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
    return;
  }
  async function generateCSS(prompt) {
    console.log("cssActive----");
    let cssCode = "";
    const cssResult = await model.generateContentStream(
      prompt +
        "response just JSON object of CSS {body{...}...}, dont use some urls as Placeholder"
    );

    for await (const chunk of cssResult.stream) {
      cssCode += chunk.text().trim();
    }
    console.log("cssCode", cssCode);

    try {
      // Entferne die unnötigen Zeichen und formatiere den CSS-Code
      const cleanResponse = cssCode
        .replace(/(\r\n|\n|\r)/gm, "") // Entferne Zeilenumbrüche
        .replace(/\s{2,}/g, " ") // Entferne überflüssige Leerzeichen
        .replace(/,(\s*])/, "]"); // Entferne abschließende Kommas

      // Parse das JSON
      const parsedCSS = JSON.parse(cleanResponse);

      // Wandle das JSON-Objekt in einen CSS-String um
      let cssString = CSSBuilding(parsedCSS);

      console.log("parsedCSS", cssString);

      // Setze das CSS
      setCss(cssString);

      return cssString;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  }

  async function generateJS(prompt) {
    let jsCode = "";
    const jsResult = await model.generateContentStream(
      prompt +
        ` response just JSON object of Javascript like {},
      requirement: REPONSE JUST {'script':{...}}
      `
    );

    for await (const chunk of jsResult.stream) {
      jsCode += chunk.text().trim();
    }
    console.log("jsCode", jsCode);

    try {
      // Entferne überflüssige Zeichen und formatiere den JSON-Code
      const cleanResponse = jsCode
        .replace(/\\n/g, "") // Entferne escaped Zeilenumbrüche
        .replace(/\\t/g, "") // Entferne escaped Tabulatoren
        .replace(/\s{2,}/g, " ") // Entferne überflüssige Leerzeichen
        .trim();
      console.log("Regenerating has cleanResponse", cleanResponse);

      // Überprüfe, ob der bereinigte String tatsächlich ein JSON-Objekt ist
      if (!cleanResponse.startsWith("{") || !cleanResponse.endsWith("}")) {
        throw new Error("Received data is not a valid JSON object.");
      }

      // Parse das JSON
      const parsedJS = JSON.parse(cleanResponse);
      console.log("Regenerating has parsedJS", parsedJS);

      // Extrahiere den JavaScript-Code
      const scriptCode = parsedJS.script;
      console.log("Regenerating has scriptCode", scriptCode);

      const formattedScriptCode = scriptCode
        .replace(/\/\/[^\n]*/g, (match) => match + "\n") // Kommentare in neue Zeile
        .replace(/;(?=\S)/g, ";\n") // Semikolons gefolgt von Text in neue Zeile
        .replace(/(?<=\})\s*(?=\w)/g, "\n") // Schließen der geschweiften Klammer gefolgt von Text in neue Zeile
        .trim();

      // Ausgabe des formatierten JavaScript-Codes
      console.log("Regenerating has formattedScriptCode", formattedScriptCode);

      // Setze den JavaScript-Code
      setJs(formattedScriptCode);

      return formattedScriptCode;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  }
  async function reGenerateJS(prompt) {
    console.log("Regenerating has startet");
    const jsPrompt = `Write JavaScript code for this HTML ${html}, with CSS ${css}, based on what is under Js: ${prompt} to enhance the following HTML structure with dynamic behavior. Consider adding features like: interactive elements, data fetching, animations.`;
    let jsCode = "";
    const jsResult = await model.generateContentStream(
      jsPrompt +
        ` requirement: response just JSON object of Javascript like {'script':{...}}
        requirement 1: whout any COMMENTS inside the code, JUST PURE JS-CODE
        requirement 2: RESPONSE JUST {'script':{...}}
        requirement 3: WITHOUT ANY COMMENT-LINES`
    );
    console.log("Regenerating has result");

    for await (const chunk of jsResult.stream) {
      jsCode += chunk.text().trim();
    }
    console.log("jsCode", jsCode);
    console.log("Regenerating has chunks");

    try {
      // Entferne überflüssige Zeichen und formatiere den JSON-Code
      const cleanResponse = jsCode
        .replace(/\\n/g, "") // Entferne escaped Zeilenumbrüche
        .replace(/\\t/g, "") // Entferne escaped Tabulatoren
        .replace(/\s{2,}/g, " ") // Entferne überflüssige Leerzeichen
        .trim();
      console.log("Regenerating has cleanResponse", cleanResponse);

      // Überprüfe, ob der bereinigte String tatsächlich ein JSON-Objekt ist
      if (!cleanResponse.startsWith("{") || !cleanResponse.endsWith("}")) {
        throw new Error("Received data is not a valid JSON object.");
      }

      // Parse das JSON
      const parsedJS = JSON.parse(cleanResponse);
      console.log("Regenerating has parsedJS", parsedJS);

      // Extrahiere den JavaScript-Code
      const scriptCode = parsedJS.script;
      console.log("Regenerating has scriptCode", scriptCode);

      const formattedScriptCode = scriptCode
        .replace(/\/\/[^\n]*/g, (match) => match + "\n") // Kommentare in neue Zeile
        .replace(/;(?=\S)/g, ";\n") // Semikolons gefolgt von Text in neue Zeile
        .replace(/(?<=\})\s*(?=\w)/g, "\n") // Schließen der geschweiften Klammer gefolgt von Text in neue Zeile
        .trim();

      // Ausgabe des formatierten JavaScript-Codes
      console.log("Regenerating has formattedScriptCode", formattedScriptCode);

      // Setze den JavaScript-Code
      setJs(formattedScriptCode);

      return scriptCode;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  }
  async function reGenerateCSS(prompt) {
    console.log("cssActive----");
    let cssCode = "";
    const cssPrompt = `Create modern and creative-colorfull CSS styles for the following HTML: ${html} and based what is written under point CSS: ${prompt}. Focus on modern layout, and design like in this color palate:-for primery, secondary, and accent color, and structure.`;
    const cssResult = await model.generateContentStream(
      cssPrompt +
        "response just JSON object of CSS {body{...}...}, dont use some urls as Placeholder"
    );

    for await (const chunk of cssResult.stream) {
      cssCode += chunk.text().trim();
    }
    console.log("cssCode", cssCode);

    try {
      // Entferne die unnötigen Zeichen und formatiere den CSS-Code
      const cleanResponse = cssCode
        .replace(/(\r\n|\n|\r)/gm, "") // Entferne Zeilenumbrüche
        .replace(/\s{2,}/g, " ") // Entferne überflüssige Leerzeichen
        .replace(/,(\s*])/, "]"); // Entferne abschließende Kommas

      // Parse das JSON
      const parsedCSS = JSON.parse(cleanResponse);

      // Wandle das JSON-Objekt in einen CSS-String um
      let cssString = CSSBuilding(parsedCSS);

      console.log("parsedCSS", cssString);

      // Setze das CSS
      setCss(cssString);

      return cssString;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  }
  async function reGenerateHTML(prompt) {
    // Prompt wird um HTML-spezifische Anweisung erweitert
    let htmlCode = "";
    const htmlPrompt = `Generate a Modern and creative HTML exactly structure for HTML CODE for ${prompt}. Include all the essential HTML tags and structure and use from this fonts, for primery,secondary, and accent font.`;
    const htmlResult = await model.generateContentStream(
      htmlPrompt +
        "response just JSON object of HTML {html:...}, and create placeHolder-Content: 'lorem Ipsum' inside"
    );

    for await (const chunk of htmlResult.stream) {
      htmlCode += chunk.text().trim();
    }

    console.log("htmlChunk", htmlCode);
    try {
      const cleanResponse = htmlCode
        .replace(/(\r\n|\n|\r)/gm, "") // Remove newlines
        .replace(/\s{2,}/g, " ") // Remove extra spaces
        .replace(/,(\s*])/, "]"); // Remove trailing commas
      // Parse das JSON
      const parsedHTML = JSON.parse(cleanResponse);
      console.log("parsedHTML", parsedHTML);
      // Extrahiere den Wert des "html"-Schlüssels
      //   const htmlContent = parsedHTML.html;
      // Setze das HTML
      setHtml(parsedHTML.html);

      return parsedHTML;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
    return;
  }

  function CSSBuilding(parsedCSS) {
    let cssString = "";

    for (const [selector, styles] of Object.entries(parsedCSS)) {
      const styleString = Object.entries(styles)
        .map(
          ([property, value]) =>
            `${property
              .replace(/([a-z])([A-Z])/g, "$1-$2")
              .toLowerCase()}: ${value};`
        ) // Konvertiere CamelCase in kebab-case
        .join(" ");

      cssString += `${selector} { ${styleString} }\n`;
    }

    return cssString;
  }

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      runWriteCodes(prompt);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: "1",
        // border: "1px solid red",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "2px",
          justifyContent: "space-between",
          px: "6px",
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          {tabs.map((tan) => (
            <Box
              onClick={() => handleTab(tan)}
              sx={{
                display: "flex",
                px: "8px",
                py: "4px",
                border: "4px",
                background: tab === tan ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,1)",
                cursor: "pointer",
                minWidth: "40px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  color:
                    tab === tan
                      ? "rgba(225,225,225,1)"
                      : "rgba(225,225,225,0.5)",
                  fontSize: "12px",
                }}
              >
                {tan}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box
          onClick={() => handleTab("allTogether")}
          sx={{
            display: "flex",
            px: "8px",
            py: "4px",
            border: "4px",
            background:
              tab === "allTogether" ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,1)",
            cursor: "pointer",
            minWidth: "20px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.49984 18.3334H12.4998C16.6665 18.3334 18.3332 16.6667 18.3332 12.5001V7.50008C18.3332 3.33341 16.6665 1.66675 12.4998 1.66675H7.49984C3.33317 1.66675 1.6665 3.33341 1.6665 7.50008V12.5001C1.6665 16.6667 3.33317 18.3334 7.49984 18.3334Z"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.5 1.66675V18.3334"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13 2V18"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Box>
      </Box>
      {tab === "Preview" ? (
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            height: "100%",
            background: "#EFEFEF",
          }}
          className="pane"
        >
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
          />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: "1",
          }}
        >
          {tab === "allTogether" && (
            <Grid
              container
              xs={12}
              md={12}
              lg={12}
              className="pane top-pane"
              sx={{
                display: "flex",
                backgroundColor: "#1E1E1E",
              }}
            >
              <Grid
                item
                xs={4}
                md={4}
                lg={4}
                className="pane top-pane"
                sx={{
                  display: "flex",
                  backgroundColor: "#1E1E1E",
                  overflow: "hidden",
                }}
              >
                <Editor
                  language="xml"
                  displayName="HTML"
                  value={html}
                  onChange={setHtml}
                />
              </Grid>
              <Grid
                item
                xs={4}
                md={4}
                lg={4}
                className="pane top-pane"
                sx={{
                  display: "flex",
                  backgroundColor: "#1E1E1E",
                  overflow: "hidden",
                }}
              >
                <Editor
                  language="css"
                  displayName="CSS"
                  value={css}
                  onChange={setCss}
                />
              </Grid>
              <Grid
                item
                xs={4}
                md={4}
                lg={4}
                className="pane top-pane"
                sx={{
                  display: "flex",
                  backgroundColor: "#1E1E1E",
                  overflow: "hidden",
                }}
              >
                <Editor
                  language="javascript"
                  displayName="JS"
                  value={js}
                  onChange={setJs}
                />
              </Grid>
            </Grid>
          )}
          {tab === "<HTML>" && (
            <Grid
              container
              xs={12}
              md={12}
              lg={12}
              className="pane top-pane"
              sx={{
                display: "flex",
                backgroundColor: "#000",
                overflow: "hidden",
              }}
            >
              <Editor
                language="xml"
                displayName="HTML"
                value={html}
                onChange={setHtml}
              />
            </Grid>
          )}
          {tab === "CSS" && (
            <Grid
              container
              xs={12}
              md={12}
              lg={12}
              className="pane top-pane"
              sx={{
                display: "flex",
                backgroundColor: "#000",
                overflow: "hidden",
              }}
            >
              <Editor
                language="css"
                displayName="CSS"
                value={css}
                onChange={setCss}
              />
            </Grid>
          )}
          {tab === "JS" && (
            <Grid
              container
              xs={12}
              md={12}
              lg={12}
              className="pane top-pane"
              sx={{
                display: "flex",
                backgroundColor: "#000",
                overflow: "hidden",
              }}
            >
              <Editor
                language="javascript"
                displayName="JS"
                value={js}
                onChange={setJs}
              />
            </Grid>
          )}
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              background: "#1E1E1E",
            }}
          >
            <Button onClick={() => reGenerateHTML(prompt)}>
              Regenerete HTML
            </Button>
            <Button onClick={() => reGenerateCSS(prompt)}>
              Regenerete CSS
            </Button>
            <Button onClick={() => reGenerateJS(prompt)}>Regenerete JS</Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              background: "#181818",
              px: "16px",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                maxHeight: "100px",
                overflow: "auto",
                color: "green",
                flexDirection: "column",
              }}
            >
              {consoleLoad.map((logOut, index) => (
                <Typography
                  key={index}
                  sx={{
                    fontSize: "13px",
                    fontFamily: "Inconsolata, monospace",
                    fontWeight: "400",
                    fontStyle: "normal",
                  }}
                >
                  {logOut}
                </Typography>
              ))}
            </Box>
            <InputBase
              onChange={handleChange}
              onKeyDown={handleEnterPress}
              multiline
              rows={8}
              fullwidth
              sx={{
                // border: "1px solid white",
                width: "100%",
                color: "#fff",
                fontSize: "13px",
                fontFamily: "Inconsolata, monospace",
                fontWeight: "400",
                fontStyle: "normal",
              }}
            />
            <Button onClick={() => runWriteCodes(prompt)}>Generate</Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Collector;
