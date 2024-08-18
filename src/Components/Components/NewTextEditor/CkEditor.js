import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Box } from "@mui/material";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  Undo,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import "./style.css";

export default function CkEditor() {
  return (
    <Box sx={{ display: "flex", flexGrow: "1", border: "1px solid blue" }}>
      <CKEditor
        className="editor-style"
        editor={ClassicEditor}
        config={{
          toolbar: [
            "undo",
            "redo",
            "|",
            "heading",
            "|",
            "bold",
            "italic",
            "|",
            "link",
            "insertTable",
            "mediaEmbed",
            "|",
            "bulletedList",
            "numberedList",
            "indent",
            "outdent",
          ],
          plugins: [
            Bold,
            Essentials,
            Heading,
            Indent,
            IndentBlock,
            Italic,
            Link,
            List,
            MediaEmbed,
            Paragraph,
            Table,
            Undo,
          ],
          initialData: "<h1>Hello from CKEditor 5!</h1>",
        }}
      />
    </Box>
  );
}
