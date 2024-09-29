import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Tooltip } from "@mui/material";
import { NextButton, PrevButton, usePrevNextButtons } from "./slider";

interface SliderProps {
  category: {
    name: string;
    component: () => React.JSX.Element;
  }[];
}

function SkillSlider({ category }: SliderProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {category.map((c, index) => (
        <div key={index} className="slider__slide">
          <Tooltip
            title={c.name}
            placement="bottom"
            classes={{
              tooltip: "bg-slate-800 p-2 text-sm",
              arrow: "text-slate-800",
            }}
            arrow
          >
            <div
              key={index}
              className={`flex justify-center items-center p-2 mob:p-4
                  rounded-lg transition-all ease-out duration-300 hover:scale-105 link
                  ${
                    mounted && theme === "dark"
                      ? "hover:bg-slate-800"
                      : "hover:bg-slate-50"
                  }`}
            >
              {<c.component />}
            </div>
          </Tooltip>
        </div>
      ))}
    </>
  );
}

interface SkillsProps {
  options: EmblaOptionsType;
  categoryList: {
    name: string;
    component: () => React.JSX.Element;
  }[];
}

function Skills({ options, categoryList }: SkillsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <div className="my-4 flex justify-center items-center">
      <PrevButton click={onPrevButtonClick} />

      <section className="slider">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="slider__container">
            <SkillSlider category={categoryList} />
          </div>
        </div>
      </section>

      <NextButton click={onNextButtonClick} />
    </div>
  );
}

export default Skills;
