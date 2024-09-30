import React from "react";
import { useTheme } from "next-themes";

interface ButtonProps {
  children: any;
  onClick: (...args: any[]) => any;
  classes: string;
}

function ButtonComponent({ children, onClick, classes }: ButtonProps) {
  const { theme } = useTheme();
  const currentTheme = theme || "dark";
  return (
    <button
      onClick={onClick}
      type="button"
      className={`text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2
        flex items-center transition-all ease-out duration-300 ${classes} ${
        currentTheme === "dark"
          ? "hover:bg-slate-600 text-white"
          : "hover:bg-slate-100"
      } hover:scale-105 active:scale-100  tablet:first:ml-0 link`}
    >
      {children}
    </button>
  );
}

export default ButtonComponent;
