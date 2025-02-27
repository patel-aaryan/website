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

function Socials() {
  const animation =
    "rounded-lg transition-all duration-300 ease-out hover:scale-125";

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <div
      className="mt-2 laptop:mt-5 flex flex-wrap mob:flex-nowrap
    link justify-center tablet:justify-normal"
    >
      <ButtonComponent
        onClick={() => window.open(data.socials.linkedin)}
        classes={animation}
      >
        <LinkedIn />
      </ButtonComponent>

      <ButtonComponent
        onClick={() => window.open(data.socials.github)}
        classes={animation}
      >
        <Github />
      </ButtonComponent>

      <ButtonComponent
        onClick={() => window.open(data.socials.devpost)}
        classes={animation}
      >
        <Devpost />
      </ButtonComponent>

      <ButtonComponent
        onClick={() => window.open(data.socials.instagram)}
        classes={animation}
      >
        <Instagram />
      </ButtonComponent>

      <ButtonComponent
        onClick={() => window.open(data.socials.email)}
        classes={animation}
      >
        <Email />
      </ButtonComponent>
    </div>
  );
}

export default Socials;
