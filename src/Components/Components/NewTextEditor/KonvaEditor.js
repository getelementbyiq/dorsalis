import React, { useState, useEffect } from "react";
import {
  TransformWrapper,
  TransformComponent,
} from "@tiendeo/react-zoom-pan-pinch";

const Whiteboard = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Verzögerung der Initialisierung um sicherzustellen, dass alle Komponenten geladen sind
    const timer = setTimeout(() => setIsReady(true), 500); // 500ms Verzögerung
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return <div>Loading...</div>; // oder eine andere Platzhalterkomponente
  }

  return (
    <TransformWrapper>
      <TransformComponent>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            background: "white",
            position: "relative",
          }}
        >
          {/* Hier Ihre weiteren Komponenten */}
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default Whiteboard;
