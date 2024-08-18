import { Box } from "@mui/material";
import { keyframes } from "@emotion/react";

export const BgGlow = ({ one, two, three, four }) => {
  console.log("color", one, two, three, four);
  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: "-1",
        display: "flex",
        // width: "80px",
        // height: "80px",
        // clipPath: "circle(50% at 50% 50%)",
        borderRadius: "50%",
        // filter: "blur(10rem)",
        // background: "rgba(21, 17, 226, 0.5)",

        boxShadow: ` 0 0 60px 30px rgba${
          (one, two, three, four)
        }, 0 0 100px 60px rgba${(one, two, three, four)}, 0 0 400px 200px rgba${
          (one, two, three, four)
        } `,

        top: "50%",
        left: "50%",
        // animation: `${glowAnimation} 3s infinite ease-in-out`,
      }}
    ></Box>
  );
};

export const glowAnimation = keyframes`
0% {
  opacity: 0.8;
  transform: translate(-50%, -50%) scale(1);
}
50% {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.2);
}
  100% {
  opacity: 0.8;
  transform: translate(-50%, -50%) scale(1);
}
`;
