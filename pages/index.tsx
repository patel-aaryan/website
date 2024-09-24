import { useRef, useLayoutEffect, useEffect } from "react";
import Header from "../components/Header";
import Socials from "../components/Socials";
import data from "../data/portfolio.json";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Image from "next/image";

import Education from "../components/Education";
import Work from "../components/Work";

export default function Home() {
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

        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={eduRef}>
          <h1 className="text-2xl text-bold" id="ed">
            Education
          </h1>
          <div className="mt-5 tablet:m-10 gap-6">
            <Education />
          </div>
        </div>

        {/* Vertical carousel/slider design */}
        {/* Languages, Frontend, Backend, Devops (Cloud), Software Tools */}
        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={skillsRef}>
          <h1 className="text-2xl text-bold">Skills</h1>
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
        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={workRef}>
          <h1 className="text-2xl text-bold">Work Experience</h1>
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
        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={projectsRef}>
          <h1 className="text-2xl text-bold">Projects</h1>
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