import React from "react";
import { DndProvider, useDraggable, useDroppable } from "@dnd-kit/core";
import {
  sortableKeyboardCoordinates,
  sortableContainer,
  sortableElement,
} from "@dnd-kit/sortable";

const DraggableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
        ...attributes.style,
        cursor: "grab",
        padding: "8px",
        border: "1px solid #ccc",
        marginBottom: "8px",
        backgroundColor: "white",
      }}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};

const DroppableContainer = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        border: "2px dashed #ccc",
        padding: "16px",
        minHeight: "200px",
        backgroundColor: "#f9f9f9",
      }}
    >
      {children}
    </div>
  );
};

const Workspace = () => {
  return (
    <DndProvider>
      <DroppableContainer id="workspace">
        <DraggableItem id="item-1">Item 1</DraggableItem>
        <DraggableItem id="item-2">Item 2</DraggableItem>
        <DraggableItem id="item-3">Item 3</DraggableItem>
      </DroppableContainer>
    </DndProvider>
  );
};

export default Workspace;
