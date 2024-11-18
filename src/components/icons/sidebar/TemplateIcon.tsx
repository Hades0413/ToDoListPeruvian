import type { SVGProps } from "react";

export default function TdesignTemplateFilled(props: SVGProps<SVGSVGElement>) {
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
        d="M22 2H2v6h20zm0 8H11v12h11zM9 22V10H2v12z"
      ></path>
    </svg>
  );
}
