import React, { useState } from "react";

const ZoomableCanvas = ({ children }) => {
  const [scale, setScale] = useState(1);

  const handleWheel = (event) => {
    event.preventDefault();
    const scaleFactor = 0.1;
    let newScale = scale;

    if (event.deltaY < 0) {
      newScale += scaleFactor;
    } else {
      newScale = Math.max(0.1, newScale - scaleFactor);
    }

    setScale(newScale);
  };

  return (
    <div
      className="canvas-container"
      onWheel={handleWheel}
      style={{
        overflow: "auto",
        position: "relative",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        className="canvas-content"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "0 0",
          width: "200%",
          height: "200%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ZoomableCanvas;
