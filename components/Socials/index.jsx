import React, { useEffect, useState } from "react";
import Button from "../Button";
import { useTheme } from "next-themes";
import Image from "next/image";

import data from "../../data/portfolio.json";
import LinkedIn from "../../public/images/linkedin.svg";
import Github from "../../public/images/github.svg";
import Devpost from "../../public/images/devpost.svg";
import Instagram from "../../public/images/instagram.svg";
import Email from "../../public/images/email.svg";

function Socials({ className }) {
  const { theme, setTheme } = useTheme() || "dark";
  const animation = "transition-all duration-300 ease-out hover:scale-125";

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <div className={`${className} flex flex-wrap mob:flex-nowrap link`}>
      <Button onClick={() => window.open(data.socials.linkedin)}>
        <LinkedIn className={animation} />
      </Button>

      <Button onClick={() => window.open(data.socials.github)}>
        <Github className={animation} />
      </Button>

      <Button onClick={() => window.open(data.socials.devpost)}>
        <Devpost className={animation} />
      </Button>

      <Button onClick={() => window.open(data.socials.instagram)}>
        <Instagram className={animation} />
      </Button>

      <Button onClick={() => window.open(data.socials.email)}>
        <Email className={animation} />
      </Button>
    </div>
  );
}

export default Socials;
