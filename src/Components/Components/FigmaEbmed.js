import React from "react";
import PropTypes from "prop-types";

const FigmaEmbed = ({ url, width, height }) => {
  const iframeUrl = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(
    url
  )}`;

  return (
    <iframe
      title="Figma Embed"
      src={iframeUrl}
      style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
      width={width}
      height={height}
      allowFullScreen
    ></iframe>
  );
};

FigmaEmbed.propTypes = {
  url: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};

FigmaEmbed.defaultProps = {
  width: "800px",
  height: "450px",
};

export default FigmaEmbed;
