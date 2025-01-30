import { useRef, useLayoutEffect, useEffect, useState } from "react";
import Header from "../components/Header";
import Socials from "../components/Socials";
import data from "../data/portfolio.json";
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
import HeadlineSlider from "../components/HeadlineSlider";

export default function Home() {
  const { theme } = useTheme();

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
    {
      name: "Languages",
      list: languages,
      gradient: "bg-gradient-to-br from-red-400 to-red-600",
    },
    {
      name: "Frontend",
      list: frontend,
      gradient: "bg-gradient-to-br from-blue-400 to-blue-600",
    },
    {
      name: "Backend",
      list: backend,
      gradient: "bg-gradient-to-br from-green-400 to-green-600",
    },
    {
      name: "DevOps",
      list: devops,
      gradient: "bg-gradient-to-br from-purple-400 to-purple-600",
    },
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

  return (
    <div className="relative mx-auto px-4 content-center" ref={topRef}>
      {/* <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div> */}

      <div className="container mx-auto mb-10">
        <Header handleScroll={handleScroll} />
        <div className="laptop:mt-20 mt-10">
          <div className="mt-5">
            <h1
              className="text-2xl tablet:text-3xl laptop:text-3xl laptopl:text-4xl
              p-1 tablet:p-2 text-bold w-full laptop:w-4/5 flex justify-center"
            >
              <HeadlineSlider headlines={data.headerTaglineOne} />
            </h1>
          </div>
          <Socials />
        </div>

        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0 flex flex-col laptop:flex-row">
          <div className="laptop:w-3/5">
            <h1 className="text-3xl text-bold text-center tablet:text-left">
              About Me
            </h1>
            <p
              className="tablet:m-10 mt-2 text-xl laptop:text-xl
            text-center tablet:text-left tablet:w-3/4"
            >
              {data.aboutMe}
            </p>
          </div>
          <div className="laptop:w-2/5 flex justify-center items-center mt-6 laptop:mt-[-250px]">
            <Image
              className="transition duration-300 ease-out w-auto h-auto max-w-full"
              src={"/profile.png"}
              alt="profile"
              width={384}
              height={384}
              priority
            />
          </div>
        </div>

        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={eduRef}>
          <h1
            className="text-2xl text-bold text-center tablet:text-left"
            id="ed"
          >
            Education
          </h1>
          <div className="mt-5 tablet:m-10 gap-6 overflow-hidden">
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
          <h1 className="text-2xl text-bold text-center tablet:text-left">
            Skills
          </h1>
          <div className="mt-5 tablet:m-10">
            <Skills categoryList={skillsCategories} />
          </div>
        </div>

        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={workRef}>
          <h1 className="text-2xl text-bold text-center tablet:text-left">
            Work Experience
          </h1>
          <div className="mt-5 tablet:m-10 gap-6">
            <Work />
          </div>
        </div>

        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={projectsRef}>
          <h1 className="text-2xl text-bold text-center tablet:text-left">
            Projects
          </h1>
          <div
            className="mt-5 tablet:m-10 flex justify-center items-center
            flex-col h-3/4 gap-6"
          >
            <div className="hidden laptop:block laptop:scale-85 desktop:scale-100">
              <Projects activeSlide={0} />
            </div>
            <div className="block laptop:hidden justify-center items-center">
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
          sx={{
            justifyContent: { xs: "center", sm: "center", md: "flex-start" },
          }}
        >
          <Grid2 size={{ xs: 12, sm: 12, md: 8 }}>
            <Contact />
          </Grid2>

          <Grid2
            size={{ xs: 4 }}
            sx={{ display: { xs: "none", sm: "none", md: "block" } }}
          >
            <ContactCard />
          </Grid2>
        </Grid2>
      </div>
    </div>
  );
}
