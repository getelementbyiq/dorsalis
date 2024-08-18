import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import GeminiAssistant from "./path/to/GeminiAssistant";

ClassicEditor.create(document.querySelector("#editor"), {
  plugins: [GeminiAssistant /* andere Plugins */],
  toolbar: ["geminiCommand" /* andere Toolbar-Elemente */],
})
  .then((editor) => {
    console.log("Editor wurde initialisiert");
  })
  .catch((error) => {
    console.error("Fehler beim Initialisieren des Editors", error);
  });
