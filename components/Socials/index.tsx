import React, { useEffect, useState } from "react";
import ButtonComponent from "../Button";
import data from "../../data/portfolio.json";
import {
  LinkedIn,
  Github,
  Devpost,
  Instagram,
  Email,
} from "../../public/socials";

interface SocialsProps {
  className: string;
}

function Socials({ className }: SocialsProps) {
  const animation = "transition-all duration-300 ease-out hover:scale-125";

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <div className={`${className} flex flex-wrap mob:flex-nowrap link`}>
      <ButtonComponent
        onClick={() => window.open(data.socials.linkedin)}
        classes={animation}
        type="button"
      >
        <LinkedIn />
      </ButtonComponent>

      <ButtonComponent
        onClick={() => window.open(data.socials.github)}
        classes={animation}
        type="button"
      >
        <Github />
      </ButtonComponent>

      <ButtonComponent
        onClick={() => window.open(data.socials.devpost)}
        classes={animation}
        type="button"
      >
        <Devpost />
      </ButtonComponent>

      <ButtonComponent
        onClick={() => window.open(data.socials.instagram)}
        classes={animation}
        type="button"
      >
        <Instagram />
      </ButtonComponent>

      <ButtonComponent
        onClick={() => window.open(data.socials.email)}
        classes={animation}
        type="button"
      >
        <Email />
      </ButtonComponent>
    </div>
  );
}

export default Socials;
