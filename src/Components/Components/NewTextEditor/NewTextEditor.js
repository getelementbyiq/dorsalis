import React from "react";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { useSyncDemo } from "@tldraw/sync";
import "./style.css";

const TldrawComponent = () => {
  const store = useSyncDemo({ roomId: "myapp-abc123" });
  return (
    <div style={{ display: "flex", flexGrow: "1" }}>
      <Tldraw store={store} />
    </div>
  );
};

export default TldrawComponent;

// Working komponent
// /###########################################
// /###########################################
// /###########################################
// /###########################################
