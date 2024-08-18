import React, { useState, useRef } from "react";
import FigmaEmbed from "./FigmaEbmed";

const DraggableResizableCard = ({ figmaUrl }) => {
  const [position, setPosition] = useState({ top: 50, left: 50 });
  const [size, setSize] = useState({ width: 300, height: 200 });
  const cardRef = useRef(null);

  const handleMouseDown = (e) => {
    const startX = e.clientX - position.left;
    const startY = e.clientY - position.top;

    const handleMouseMove = (e) => {
      setPosition({
        top: e.clientY - startY,
        left: e.clientX - startX,
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleResizeMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = cardRef.current.offsetWidth;
    const startHeight = cardRef.current.offsetHeight;

    const handleMouseMove = (e) => {
      setSize({
        width: startWidth + (e.clientX - startX),
        height: startHeight + (e.clientY - startY),
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={cardRef}
      style={{
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        border: "1px solid rgba(0, 0, 0, 0.1)",
        background: "white",
        padding: "10px",
        cursor: "move",
        boxSizing: "border-box",
      }}
      onMouseDown={handleMouseDown}
    >
      <FigmaEmbed url={figmaUrl} width="100%" height="100%" />
      <div
        style={{
          position: "absolute",
          right: "0",
          bottom: "0",
          width: "20px",
          height: "20px",
          backgroundColor: "#ddd",
          cursor: "se-resize",
        }}
        onMouseDown={handleResizeMouseDown}
      />
    </div>
  );
};

export default DraggableResizableCard;
