import React from "react";

const PreviewPage = () => {
  const generateHtml = () => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview</title>
        <style id="dynamic-css"></style>
      </head>
      <body>
        <div id="dynamic-html"></div>
        <script id="dynamic-js"></script>
        <script>
          // Lade den Code aus sessionStorage
          const html = sessionStorage.getItem("html");
          const css = sessionStorage.getItem("css");
          const js = sessionStorage.getItem("js");

          // Setze den HTML-Inhalt
          document.getElementById("dynamic-html").innerHTML = html;

          // Setze den CSS-Stil
          document.getElementById("dynamic-css").innerHTML = css;

          // Führe das JavaScript aus
          const script = document.createElement("script");
          script.textContent = js;
          document.body.appendChild(script);
        </script>
      </body>
      </html>
    `;
  };

  const openPreviewInNewTab = () => {
    const html = generateHtml();
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return <button onClick={openPreviewInNewTab}>Open Preview in New Tab</button>;
};

export default PreviewPage;
