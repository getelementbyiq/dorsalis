import React from "react";
import "./RotatingBorderCircle.css";

const RotatingBorderCircle = () => {
  return (
    <svg
      width="953"
      height="953"
      viewBox="0 0 953 953"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="476.5"
        cy="476.5"
        r="476"
        stroke="url(#paint0_linear_29_2143)"
        className="rotating-border"
      />
      <defs>
        <linearGradient
          id="paint0_linear_29_2143"
          x1="476.5"
          y1="0"
          x2="476.5"
          y2="953"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="0.291667" stopColor="#0066FF" />
          <stop offset="0.565" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default RotatingBorderCircle;
