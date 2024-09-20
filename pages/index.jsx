import { useRef } from "react";
import Header from "../components/Header";
import Socials from "../components/Socials";
import data from "../data/portfolio.json";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Image from "next/image";

import Education from "./../components/Education";
import Work from "../components/Work";
import { Timeline } from "@mui/lab";

export default function Home() {
  const textOne = useRef();
  const textTwo = useRef();
  const topRef = useRef();
  const eduRef = useRef();
  const skillsRef = useRef();
  const workRef = useRef();
  const projectsRef = useRef();
  const contactRef = useRef();

  const refMap = new Map([
    ["top", topRef],
    ["edu", eduRef],
    ["skills", skillsRef],
    ["work", workRef],
    ["projects", projectsRef],
    ["contact", contactRef],
  ]);

  const handleScroll = (ref) => {
    const refName = refMap.get(ref);
    if (refName && refName.current) {
      window.scrollTo({
        top: refName.current.offsetTop - 50,
        behavior: "smooth",
      });
    }
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  return (
    <div className="relative" ref={topRef}>
      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header handleScroll={handleScroll} />
        <div className="laptop:mt-20 mt-10">
          <div className="mt-5">
            <h1
              ref={textOne}
              className="text-3xl tablet:text-4xl laptop:text-4xl laptopl:text-6xl
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
          <Socials className="mt-2 laptop:mt-5" />
        </div>

        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0 flex flex-col laptop:flex-row">
          <div className="laptop:w-3/5">
            <h1 className="text-3xl text-bold">About Me</h1>
            <p className="tablet:m-10 mt-2 text-xl laptop:text-xl w-3/4">
              {data.aboutMe}
            </p>
          </div>
          <div className="laptop:w-2/5 flex justify-center items-center mt-6">
            <Image
              className="transitionall duration-300 ease-out"
              src={"/profile.png"}
              alt="profile"
              width={320}
              height={320}
            />
          </div>
        </div>

        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
          <h1 className="text-2xl text-bold" id="ed" ref={eduRef}>
            Education
          </h1>
          <div className="mt-5 tablet:m-10 gap-6">
            <Timeline className="max-w-5xl">
              {data.education.map((school, index) => (
                <Education key={index} school={school} index={index} />
              ))}
            </Timeline>
          </div>
        </div>

        {/* Vertical carousel/slider design */}
        {/* Languages, Frontend, Backend, Devops (Cloud), Software Tools */}
        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
          <h1 className="text-2xl text-bold" ref={skillsRef}>
            Skills
          </h1>
          <div className="mt-5 tablet:m-10 grid grid-cols-1 laptop:grid-cols-2 gap-6">
            {data.services.map((service, index) => (
              <Work
                key={index}
                name={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>

        {/* React MUI timeline component */}
        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
          <h1 className="text-2xl text-bold" ref={workRef}>
            Work Experience
          </h1>
          <div className="mt-5 tablet:m-10 grid grid-cols-1 laptop:grid-cols-2 gap-6">
            {data.services.map((service, index) => (
              <Work
                key={index}
                name={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>

        {/* Tinder like swiping */}
        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
          <h1 className="text-2xl text-bold" ref={projectsRef}>
            Projects
          </h1>
          <div className="mt-5 tablet:m-10 grid grid-cols-1 laptop:grid-cols-2 gap-6">
            {data.services.map((service, index) => (
              <Work
                key={index}
                name={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </div>

      <div ref={contactRef}>
        <Footer />
      </div>
    </div>
  );
}
