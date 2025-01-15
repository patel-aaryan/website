import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import ButtonComponent from "../Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import { usePrevNextButtons, PrevButton, NextButton } from "../Skills/slider";
import { Project } from "../../data/types";

interface SliderProps {
  projects: Project[];
}

function ProjectSlider({ projects }: SliderProps) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {projects.map((p, index) => (
        <div key={index} className="projectSlider__slide">
          <div className="flex justify-between">
            <h2 className="text-xl mb-4">{p.title}</h2>
            <div className="-mt-2">
              {p.link && (
                <ButtonComponent
                  onClick={() => window.open(p.link)}
                  classes="rounded-full"
                >
                  <GitHubIcon />
                </ButtonComponent>
              )}
            </div>
          </div>

          <p>{p.description}</p>
          <h2 className="mt-16">{!p.link && "Coming Soon..."}</h2>
        </div>
      ))}
    </>
  );
}

interface ProjectMobileProps {
  options: EmblaOptionsType;
  projectList: Project[];
}

function ProjectsMobile({ options, projectList }: ProjectMobileProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(
    emblaApi,
    1
  );

  return (
    <>
      <section className="projectSlider">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="projectSlider__container">
            <ProjectSlider projects={projectList} />
          </div>
        </div>
      </section>

      <div className="flex justify-center mt-2">
        <PrevButton click={onPrevButtonClick} />
        <NextButton click={onNextButtonClick} />
      </div>
    </>
  );
}

export default ProjectsMobile;
