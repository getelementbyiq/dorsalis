// import React, { useRef } from "react";
// import styled from "styled-components";

// const EditorContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-top: 20px;
// `;

// const Toolbar = styled.div`
//   width: 210mm;
//   padding: 10px;
//   border: 1px solid black;
//   display: flex;
//   justify-content: space-between;
// `;

// const Button = styled.button`
//   padding: 5px 10px;
// `;

// const Select = styled.select`
//   padding: 5px 10px;
// `;

// const Input = styled.input`
//   padding: 5px 10px;
//   margin: 0 5px;
// `;

// const TextArea = styled.div.attrs({ contentEditable: true })`
//   width: 210mm;
//   min-height: 297mm;
//   border: 1px solid gray;
//   margin-top: 10px;
//   padding: 20mm;
//   background: white;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   overflow-y: auto;
//   font-family: "Arial", sans-serif;
//   font-size: 14px;
//   line-height: 1.5;
// `;

// function TextEditor() {
//   const textAreaRef = useRef(null);

//   const applyStyle = (style, value) => {
//     if (textAreaRef.current) {
//       document.execCommand(style, false, value);
//       textAreaRef.current.focus();
//     }
//   };

//   return (
//     <EditorContainer>
//       <Toolbar>
//         <Button onClick={() => applyStyle("bold")}>Bold</Button>
//         <Button onClick={() => applyStyle("italic")}>Italic</Button>
//         <Button onClick={() => applyStyle("underline")}>Underline</Button>
//         <Select onChange={(e) => applyStyle("fontName", e.target.value)}>
//           <option value="Arial">Arial</option>
//           <option value="Consolas">Consolas</option>
//           <option value="Times New Roman">Times New Roman</option>
//         </Select>
//         <Select onChange={(e) => applyStyle("fontSize", e.target.value)}>
//           <option value="3">12pt</option>
//           <option value="5">18pt</option>
//           <option value="7">24pt</option>
//         </Select>
//         <Input
//           type="color"
//           onChange={(e) => applyStyle("foreColor", e.target.value)}
//         />
//         <Input
//           type="color"
//           onChange={(e) => applyStyle("hiliteColor", e.target.value)}
//         />
//       </Toolbar>
//       <TextArea ref={textAreaRef} />
//     </EditorContainer>
//   );
// }

// export default TextEditor;
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Circle, Compact } from "@uiw/react-color";

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Toolbar = styled.div`
  width: 210mm;
  padding: 10px;
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 5px 10px;
`;

const Select = styled.select`
  padding: 5px 10px;
`;

const TextArea = styled.div.attrs({ contentEditable: true })`
  width: 210mm;
  min-height: 297mm;
  border: 1px solid gray;
  margin-top: 10px;
  padding: 20mm;
  background: #eff4ff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  font-family: "Arial", sans-serif;
  font-size: 14px;
  line-height: 1.5;
  text-wrap: wrap;
`;

function TextEditor() {
  const textAreaRef = useRef(null);
  const [textColor, setTextColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [isFree, setIsFree] = useState(false);
  const [savedSelection, setSavedSelection] = useState(null);

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      setSavedSelection(selection.getRangeAt(0));
    }
  };

  const restoreSelection = () => {
    const selection = window.getSelection();
    if (savedSelection) {
      selection.removeAllRanges();
      selection.addRange(savedSelection);
    }
  };
  useEffect(() => {
    if (isFree) {
      restoreSelection();
      applyStyle("color", textColor);
    }
  }, [textColor, isFree]);
  useEffect(() => {
    if (isFree) {
      restoreSelection();
      applyStyle("backgroundColor", backgroundColor);
    }
  }, [backgroundColor, isFree]);

  //   useEffect(() => {
  //     if (isFree) {
  //       restoreSelection();
  //       if (textColor !== "#000000") {
  //         applyStyle("color", textColor);
  //       }
  //       if (backgroundColor !== "#ffffff") {
  //         applyStyle("backgroundColor", backgroundColor);
  //       }
  //       setIsFree(false);
  //     }
  //   }, [textColor, backgroundColor, isFree]);

  useEffect(() => {
    const applyStyleSafe = () => {
      const selection = window.getSelection();
      if (!selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      if (!document.body.contains(range.commonAncestorContainer)) {
        console.error("Die Auswahl ist nicht mehr gültig.");
        return;
      }

      const span = document.createElement("span");
      span.style.color = textColor; // Angenommen textColor ist ein Zustand
      range.surroundContents(span);

      // Setze die Auswahl zurück, um den Fokus beizubehalten
      selection.removeAllRanges();
      selection.addRange(range);
    };

    // Event-Listener, der sicherstellt, dass der Stil sicher angewendet wird
    document.addEventListener("keydown", applyStyleSafe);

    // Cleanup
    return () => {
      document.removeEventListener("keydown", applyStyleSafe);
    };
  }, [textColor]);

  const applyStyle = (style, value) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      if (document.contains(range.commonAncestorContainer)) {
        const span = document.createElement("span");
        span.style[style] = value;
        range.surroundContents(span);
        // Nach dem Ändern des DOM muss die Auswahl neu gesetzt werden
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        console.error("Die Auswahl ist nicht mehr gültig.");
      }
    } else {
      alert("Bitte wählen Sie einen Text aus.");
    }
    textAreaRef.current.focus();
  };

  const handleMouseDown = (event) => {
    event.preventDefault();
    saveSelection();
  };

  const handleSetFontColor = (color) => {
    setTextColor(color);
    setIsFree(true);
  };

  const handleSetFontBgColor = (color) => {
    setBackgroundColor(color);
    setIsFree(true);
  };

  return (
    <EditorContainer>
      <Toolbar>
        <Button onClick={() => applyStyle("fontWeight", "bold")}>Fett</Button>
        <Button onClick={() => applyStyle("fontStyle", "italic")}>
          Kursiv
        </Button>
        <Button onClick={() => applyStyle("textDecoration", "underline")}>
          Unterstrichen
        </Button>
        <Select onChange={(e) => applyStyle("fontFamily", e.target.value)}>
          <option value="Arial">Arial</option>
          <option value="Consolas">Consolas</option>
          <option value="Times New Roman">Times New Roman</option>
        </Select>
        <Select onChange={(e) => applyStyle("fontSize", `${e.target.value}px`)}>
          <option value="12">12pt</option>
          <option value="18">18pt</option>
          <option value="24">24pt</option>
        </Select>
        <Circle
          colors={[
            "#f44336",
            "#e91e63",
            "#9c27b0",
            "#673ab7",
            "#3f51b5",
            "#2196f3",
            "#000000",
            "#ffffff",
          ]}
          color={textColor}
          onChange={(color) => handleSetFontColor(color.hex)}
          onMouseDown={handleMouseDown}
        />
        <Compact
          color={backgroundColor}
          onChange={(color) => handleSetFontBgColor(color.hex)}
          onMouseDown={handleMouseDown}
        />
      </Toolbar>
      <TextArea ref={textAreaRef} onClick={saveSelection} />
    </EditorContainer>
  );
}

export default TextEditor;
