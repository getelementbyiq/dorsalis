import React from "react";
import { Editor, Transforms } from "slate";

export const ToolbarSlate = ({ editor }) => {
  const isMarkActive = (format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  const toggleMark = (format) => {
    const isActive = isMarkActive(format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  return (
    <div>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark("bold");
        }}
      >
        Bold
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark("italic");
        }}
      >
        Italic
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark("underline");
        }}
      >
        Underline
      </button>
      {/* Weitere Buttons für Listen, Überschriften usw. können hier hinzugefügt werden */}
    </div>
  );
};
