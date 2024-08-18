import React, { useRef } from "react";
import html2canvas from "html2canvas";
import FigmaEmbed from "./FigmaEmbed"; // Pfad zu deiner FigmaEmbed-Komponente

const ScreenshotButton = ({ figmaUrl }) => {
  const iframeRef = useRef(null);

  const takeScreenshot = () => {
    if (iframeRef.current) {
      html2canvas(iframeRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        // Hier kannst du das Bild herunterladen oder anzeigen
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "screenshot.png";
        link.click();
      });
    }
  };

  return (
    <div>
      <div ref={iframeRef} style={{ width: "800px", height: "450px" }}>
        <FigmaEmbed url={figmaUrl} />
      </div>
      <button onClick={takeScreenshot}>Take Screenshot</button>
    </div>
  );
};

export default ScreenshotButton;
