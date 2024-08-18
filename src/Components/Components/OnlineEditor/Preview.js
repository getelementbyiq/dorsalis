import React, { useRef, useEffect } from "react";

const PreviewComponent = ({ code }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Preview</title>
            <script src="https://unpkg.com/react/umd/react.development.js"></script>
            <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
          </head>
          <body>
            <div id="root"></div>
            <script>
              ${code}
            </script>
          </body>
        </html>
      `);
      doc.close();
    }
  }, [code]);

  return (
    <iframe
      ref={iframeRef}
      title="Preview"
      style={{ width: "100%", height: "80vh", border: "none" }}
    />
  );
};

export default PreviewComponent;
