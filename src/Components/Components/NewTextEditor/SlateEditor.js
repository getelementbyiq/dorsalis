import React, { useCallback, useMemo, useState } from "react";
import { createEditor, Transforms, Text, Editor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Box } from "@mui/material";

// Stelle sicher, dass der Name der Toolbar-Datei korrekt importiert wird
import { ToolbarSlate } from "./ToolbarSlate";

const TextEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "Ein einfacher Rich-Text-Editor mit Toolbar." }],
    },
  ]);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "heading-one":
        return <h1 {...props.attributes}>{props.children}</h1>;
      case "list-item":
        return <li {...props.attributes}>{props.children}</li>;
      default:
        return <p {...props.attributes}>{props.children}</p>;
    }
  }, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        border: "1px solid blue",
        padding: "8px",
      }}
    >
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <ToolbarSlate editor={editor} />
        <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
      </Slate>
    </Box>
  );
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

export default TextEditor;
