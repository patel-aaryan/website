import { useRef, useLayoutEffect, useEffect, useState } from "react";
import Header from "../components/Header";
import Socials from "../components/Socials";
import data from "../data/portfolio.json";
import { stagger } from "../animations";
import Contact from "../components/Footer";
import Image from "next/image";
import Education from "../components/Education/";
import Work from "../components/Work";
import { EmblaOptionsType } from "embla-carousel";
import Skills from "./../components/Skills/";
import Projects from "../components/Projects/";
import {
  languages,
  frontend,
  backend,
  devops,
} from "../components/Skills/skills";
import { VerticalTimeline } from "react-vertical-timeline-component";
import { useTheme } from "next-themes";
import { CourseInfo } from "../data/types";
import CoursePanel from "../components/Education/course";
import AchivementPanel from "../components/Education/achievements";
import ContactCard from "../components/Contact";
import { Grid2 } from "@mui/material";
import ProjectsMobile from "../components/Projects/mobile";

export default function Home() {
  const { theme } = useTheme();
  const textOne = useRef<HTMLHeadingElement>(null);
  const textTwo = useRef<HTMLHeadingElement>(null);

  const topRef = useRef<HTMLDivElement>(null);
  const eduRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const refMap = new Map<string, React.RefObject<HTMLDivElement>>([
    ["top", topRef],
    ["edu", eduRef],
    ["skills", skillsRef],
    ["work", workRef],
    ["projects", projectsRef],
    ["contact", contactRef],
  ]);

  const [isCourseActive, setIsCourseActive] = useState(false);
  const [isMilestonesActive, setIsMilestonesActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [achivementsInfo, setMilestonesInfo] = useState<string[]>([]);

  const [courseInfo, setCourseInfo] = useState<CourseInfo>({
    code: "",
    name: "",
    desc: [],
    link: "",
  });

  const skillsCategories = [
    { name: "Languages", list: languages },
    { name: "Frontend", list: frontend },
    { name: "Backend", list: backend },
    { name: "DevOps", list: devops },
  ];
  const SKILLS_OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };
  const PROJECTS_OPTIONS: EmblaOptionsType = {};

  const handleScroll = (ref: string) => {
    const refName = refMap.get(ref);
    if (refName && refName.current) {
      window.scrollTo({
        top: refName.current.offsetTop - 50,
        behavior: "smooth",
      });
    }
  };

  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  return (
    <div className="relative content-center" ref={topRef}>
      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header handleScroll={handleScroll} />
        <div className="laptop:mt-20 mt-10">
          <div className="mt-5">
            <h1
              ref={textOne}
              className="text-2xl tablet:text-4xl laptop:text-4xl laptopl:text-6xl
                          p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5"
            >
              {data.headerTaglineOne}
            </h1>
            <h1
              ref={textTwo}
              className="text-xl tablet:text-3xl laptop:text-3xl laptopl:text-4xl
                          p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineTwo}
            </h1>
          </div>
          <Socials />
        </div>

        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0 flex flex-col laptop:flex-row">
          <div className="laptop:w-3/5">
            <h1 className="text-3xl text-bold">About Me</h1>
            <p className="tablet:m-10 mt-2 text-xl laptop:text-xl w-3/4">
              {data.aboutMe}
            </p>
          </div>
          <div className="laptop:w-2/5 flex justify-center items-center mt-6 laptop:mt-[-250px]">
            <Image
              className="transition duration-300 ease-out"
              src={"/profile.png"}
              alt="profile"
              width={384}
              height={384}
            />
          </div>
        </div>

        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={eduRef}>
          <h1 className="text-2xl text-bold" id="ed">
            Education
          </h1>
          <div className="mt-5 tablet:m-10 gap-6">
            <VerticalTimeline
              animate={true}
              lineColor={`${theme === "light" ? "#121313" : "white"}`}
            >
              {data.education.map((school, index) => (
                <Education
                  key={index}
                  school={school}
                  setCourseInfo={setCourseInfo}
                  setMilestonesInfo={setMilestonesInfo}
                  setIsOpen={setIsOpen}
                  setIsCourseActive={setIsCourseActive}
                  setIsMilestonesActive={setIsMilestonesActive}
                />
              ))}
            </VerticalTimeline>

            {isCourseActive && (
              <CoursePanel
                courseInfo={courseInfo}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setIsActive={setIsCourseActive}
              />
            )}

            {isMilestonesActive && (
              <AchivementPanel
                achivementInfo={achivementsInfo}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setIsActive={setIsMilestonesActive}
              />
            )}
          </div>
        </div>

        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={skillsRef}>
          <h1 className="text-2xl text-bold">Skills</h1>
          <div className="mt-5 tablet:m-10 grid grid-cols-1 laptop:grid-cols-2 gap-6">
            {skillsCategories.map((category, index) => (
              <div key={index} className="scale-60 tablet:scale-100">
                <h1 className="flex justify-center text-2xl text-bold mb-4">
                  {category.name}
                </h1>
                <Skills options={SKILLS_OPTIONS} categoryList={category.list} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={workRef}>
          <h1 className="text-2xl text-bold">Work Experience</h1>
          <div className="mt-5 tablet:m-10 gap-6">
            <Work />
          </div>
        </div>

        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={projectsRef}>
          <h1 className="text-2xl text-bold">Projects</h1>
          <div
            className="mt-5 tablet:m-10 flex justify-center items-center
            flex-col w-full h-3/4 gap-6"
          >
            <div className="hidden tablet:block">
              <Projects activeSlide={0} />
            </div>
            <div className="block tablet:hidden justify-center items-center">
              <ProjectsMobile
                projectList={data.projects}
                options={PROJECTS_OPTIONS}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mb-10" ref={contactRef}>
        <h1 className="text-4xl text-bold mb-4 flex justify-center laptop:justify-start">
          Let&apos;s Connect!
        </h1>
        <Grid2
          container
          spacing={4}
          sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}
        >
          <Grid2 size={{ xs: 12, sm: 8 }}>
            <Contact />
          </Grid2>

          <Grid2 size={{ xs: 4 }} sx={{ display: { xs: "none", sm: "block" } }}>
            <ContactCard />
          </Grid2>
        </Grid2>
      </div>
    </div>
  );
}
