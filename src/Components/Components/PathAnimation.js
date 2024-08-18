import React, { useRef, useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

const PathAnimation = () => {
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [speed, setSpeed] = useState(5000);

  // Update path length after component mounts
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  // Spring animation configuration
  const { x } = useSpring({
    from: { x: 0 },
    to: { x: pathLength },
    config: { duration: 10000 },
    loop: true,
    reset: true,
  });

  return (
    <svg
      width="335"
      height="976"
      viewBox="0 0 335 976"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.8" filter="url(#filter0_d_25_2091)">
        <path
          ref={pathRef}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-194 111C-194 61.2944 -153.706 21 -104 21H224C273.706 21 314 61.2944 314 111V303.671C314 320.791 300.121 334.671 283 334.671H250C199.19 334.671 158 375.86 158 426.671V547.494C158 598.304 199.19 639.494 250 639.494H283C300.121 639.494 314 653.373 314 670.494V865C314 914.706 273.706 955 224 955H-104C-153.706 955 -194 914.706 -194 865V111ZM-104 20C-154.258 20 -195 60.7421 -195 111V865C-195 915.258 -154.258 956 -104 956H224C274.258 956 315 915.258 315 865V670.494C315 652.821 300.673 638.494 283 638.494H250C199.742 638.494 159 597.752 159 547.494V426.671C159 376.413 199.742 335.671 250 335.671H283C300.673 335.671 315 321.344 315 303.671V111C315 60.7421 274.258 20 224 20H-104Z"
          fill="url(#paint0_linear_25_2091)"
          shapeRendering="crispEdges"
        />
      </g>
      {/* {pathLength > 0 && (
        <animated.circle
          r="5"
          fill="red"
          style={{
            transformOrigin: "center",
            transformBox: "fill-box",
            boxShadow:
              " 0 0 60px 30px rgba(21, 17, 226, 1), 0 0 100px 60px rgba(21, 17, 226, 1), 0 0 400px 200px rgba(0, 225, 229, 1) ",

            transform: x.to((length) => {
              const point = pathRef.current.getPointAtLength(length);
              return `translate(${point.x}px, ${point.y}px)`;
            }),
          }}
        />
      )} */}
      <defs>
        <filter
          id="filter0_d_25_2091"
          x="-215"
          y="0"
          width="550"
          height="976"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.82 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_25_2091"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_25_2091"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_25_2091"
          x1="129"
          y1="488"
          x2="335.5"
          y2="488"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF32C6" stopOpacity="0.16" />
          <stop offset="1" stopColor="#01BEE8" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default PathAnimation;
