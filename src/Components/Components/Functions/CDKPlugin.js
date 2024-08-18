// Importieren der CKEditor-Basisklassen
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

class GeminiAssistant extends Plugin {
  init() {
    const editor = this.editor;

    // Einen einfachen Button zur Toolbar hinzufügen
    editor.ui.componentFactory.add("geminiCommand", (locale) => {
      const button = editor.ui.componentFactory.create("button", {
        label: "Fragen Sie Gemini",
        icon: "https://path.to/icon.png",
        tooltip: true,
      });

      // Ereignisbehandler für den Button
      button.on("execute", () => {
        const content = editor.getData();

        // Senden der Anfrage an Gemini
        fetch("https://api.gemini.example.com", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_GEMINI_API}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: content }),
        })
          .then((response) => response.json())
          .then((data) => {
            editor.model.change((writer) => {
              // Antwort von Gemini im Editor einfügen
              const responseText = writer.createText(data.response);
              editor.model.insertContent(
                responseText,
                editor.model.document.selection
              );
            });
          })
          .catch((error) =>
            console.error("Error contacting Gemini API:", error)
          );
      });

      return button;
    });
  }
}

export default GeminiAssistant;
