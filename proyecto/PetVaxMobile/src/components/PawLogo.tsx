import React from "react";

export type PawLogoProps = {
  size?: number;
  color?: string;
  className?: string;
};

const PawLogo: React.FC<PawLogoProps> = ({
  size = 128,
  color = "#00685f",
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 512 512"
      className={className}
      role="img"
      aria-label="Paw logo"
    >
      <g transform="rotate(-25 256 256)" fill={color}>
        {/* Toe pads */}
        <circle cx="170" cy="150" r="38" />
        <circle cx="250" cy="95" r="44" />
        <circle cx="330" cy="150" r="38" />
        <circle cx="380" cy="220" r="34" />

        {/* Main pad */}
        <path d="
          M256 215
          C195 215 150 265 150 335
          C150 410 205 455 256 455
          C307 455 362 410 362 335
          C362 265 317 215 256 215
          Z
        " />
      </g>
    </svg>
  );
};

export default PawLogo;