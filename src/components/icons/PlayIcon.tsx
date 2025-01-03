import type { SVGProps } from 'react';

const MdiPlay: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M8 5.14v14l11-7z"
      />
    </svg>
  );
};

export default MdiPlay;
