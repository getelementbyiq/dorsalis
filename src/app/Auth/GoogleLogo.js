import { Typography } from "@mui/material";
import { Theme } from "../../Theme";

const GoogleLogo = ({ handleGoogle }) => {
  return (
    <Typography
      onClick={handleGoogle}
      sx={{
        ...Theme.fontPrimary,
        fontSize: "24px",
        cursor: "pointer",
        transition: "150ms",
        "&&:hover": {
          transform: "scale(1.2)",
        },
      }}
    >
      <span style={{ color: "#4285F4" }}>G</span>
      <span style={{ color: "#EA4335" }}>o</span>
      <span style={{ color: "#FBBC05" }}>o</span>
      <span style={{ color: "#4285F4" }}>g</span>
      <span style={{ color: "#34A853" }}>l</span>
      <span style={{ color: "#EA4335" }}>e</span>
    </Typography>
  );
};

export default GoogleLogo;
