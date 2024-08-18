import React from "react";

const GoogleDocEmbed = ({ docId }) => {
  const url = `https://docs.google.com/document/d/${docId}/preview`;

  return (
    <div>
      <iframe
        src={url}
        width="100%"
        height="600"
        frameBorder="0"
        title="Google Doc"
      >
        Ihr Browser unterstützt keine iframes.
      </iframe>
    </div>
  );
};

export default GoogleDocEmbed;
