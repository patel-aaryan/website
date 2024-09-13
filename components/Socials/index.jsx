import React from "react";
import Button from "../Button";
import { useTheme } from "next-themes";
import Image from "next/image";

import data from "../../data/portfolio.json";

function Socials({ className }) {
  const { theme, setTheme } = useTheme();

  const iconColour = theme === "dark" ? "text-white" : "text-black";

  return (
    <div className={`${className} flex flex-wrap mob:flex-nowrap link`}>
      {data.socials.map((social, index) => (
        <Button key={index} onClick={() => window.open(social.link)}>
          <Image src={social.icon} alt="icon" width={24} height={24}></Image>
        </Button>
      ))}
    </div>
  );
}

export default Socials;
