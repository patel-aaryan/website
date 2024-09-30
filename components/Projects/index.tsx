import React, { useState } from "react";
import data from "../../data/portfolio.json";
import ButtonComponent from "../Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import GitHubIcon from "@mui/icons-material/GitHub";

interface props {
  activeSlide: number;
}

function Projects(props: props) {
  const [activeSlide, setactiveSlide] = useState(props.activeSlide);

  const next = () =>
    setactiveSlide(
      (prevActiveSlide) => (prevActiveSlide + 1) % data.projects.length
    );

  const prev = () =>
    setactiveSlide(
      (prevActiveSlide) =>
        (prevActiveSlide - 1 + data.projects.length) % data.projects.length
    );

  const getStyles = (index: number) => {
    const total = data.projects.length;
    const offset = (index - activeSlide + total) % total;

    if (offset === 0)
      return {
        opacity: 1,
        transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
        zIndex: 10,
      };
    else if (offset === total - 1 || offset === 1)
      return {
        opacity: 1,
        transform:
          offset === 1
            ? "translateX(240px) translateZ(-400px) rotateY(-35deg)"
            : "translateX(-240px) translateZ(-400px) rotateY(35deg)",
        zIndex: 9,
      };
    else if (offset === total - 2 || offset === 2)
      return {
        opacity: 1,
        transform:
          offset === 2
            ? "translateX(480px) translateZ(-500px) rotateY(-35deg)"
            : "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 8,
      };
    else if (offset === total - 3 || offset === 3)
      return {
        opacity: 0,
        transform:
          offset === 3
            ? "translateX(720px) translateZ(-600px) rotateY(-35deg)"
            : "translateX(-720px) translateZ(-600px) rotateY(35deg)",
        zIndex: 7,
      };
    return {
      opacity: 0,
      transform: `translateX(${
        offset > total / 2 ? "-" : ""
      }960px) translateZ(-700px) rotateY(${offset > total / 2 ? 35 : -35}deg)`,
      zIndex: 7,
    };
  };

  return (
    <>
      <div className="slideC">
        {data.projects.map((project, index) => (
          <React.Fragment key={index}>
            <div
              className="slide"
              style={{
                background: project.colour,
                boxShadow: `0 5px 20px ${project.colour}30`,
                ...getStyles(index),
              }}
            >
              <SliderContent
                title={project.title}
                desc={project.description}
                link={project.link}
              />
            </div>
            <div
              className="reflection"
              style={{
                background: `linear-gradient(to bottom, ${project.colour}40, transparent)`,
                ...getStyles(index),
              }}
            />
          </React.Fragment>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <ButtonComponent onClick={prev} classes="rounded-full">
          <ArrowBackIosNewIcon />
        </ButtonComponent>

        <ButtonComponent onClick={next} classes="rounded-full">
          <ArrowForwardIosIcon />
        </ButtonComponent>
      </div>
    </>
  );
}

interface SliderProps {
  title: string;
  desc: string;
  link: string;
}

function SliderContent({ title, desc, link }: SliderProps) {
  return (
    <div className="p-8 items">
      <div className="flex justify-between">
        <h2 className="text-xl mb-4">{title}</h2>
        <div className="-mt-4">
          {link && (
            <ButtonComponent
              onClick={() => window.open(link)}
              classes="rounded-full"
            >
              <GitHubIcon />
            </ButtonComponent>
          )}
        </div>
      </div>

      <p>{desc}</p>
      <h2 className="mt-16">{!link && "Coming Soon..."}</h2>
    </div>
  );
}

export default Projects;
