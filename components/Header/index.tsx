import { Popover } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../Button";
import data from "../../data/portfolio.json";

interface HeaderProps {
  handleScroll: (ref: string) => void;
  // Corrected spelling from 'handlScroll' to 'handleScroll'
}

function Header({ handleScroll }: HeaderProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const animation = "transition-all duration-300 ease-out hover:scale-125";

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <nav
      className={`sticky top-0 z-50 ${
        theme === "dark" ? "bg-[#121313]" : "bg-white"
      }`}
    >
      <Popover className="block tablet:hidden mt-5">
        {({ open }) => (
          <>
            <div className="flex items-center justify-between p-2 laptop:p-0">
              <h1
                onClick={() => handleScroll("top")}
                className="font-medium p-2 laptop:p-0 link"
              >
                {data.name}
              </h1>

              <div className="flex items-center">
                {data.darkMode && (
                  <ButtonComponent
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    type="button"
                    classes="rounded-lg"
                  >
                    <img
                      className={`h-6 ${animation}`}
                      src={`/images/${
                        theme === "dark" ? "moon.svg" : "sun.svg"
                      }`}
                    />
                  </ButtonComponent>
                )}

                <Popover.Button>
                  <img
                    className="h-5"
                    src={`/images/${
                      !open
                        ? theme === "dark"
                          ? "menu-white.svg"
                          : "menu.svg"
                        : theme === "light"
                        ? "cancel.svg"
                        : "cancel-white.svg"
                    }`}
                  />
                </Popover.Button>
              </div>
            </div>
            <Popover.Panel
              className={`absolute right-0 z-10 w-11/12 p-4 ${
                theme === "dark" ? "bg-slate-800" : "bg-white"
              } shadow-md rounded-md`}
            >
              <div className="grid grid-cols-1">
                <ButtonComponent
                  onClick={() => handleScroll("edu")}
                  type="button"
                  classes="rounded-lg"
                >
                  Education
                </ButtonComponent>
                <ButtonComponent
                  onClick={() => handleScroll("skills")}
                  type="button"
                  classes="rounded-lg"
                >
                  Skills
                </ButtonComponent>
                <ButtonComponent
                  onClick={() => handleScroll("work")}
                  type="button"
                  classes="rounded-lg"
                >
                  Experience
                </ButtonComponent>
                <ButtonComponent
                  onClick={() => handleScroll("projects")}
                  type="button"
                  classes="rounded-lg"
                >
                  Projects
                </ButtonComponent>
                <ButtonComponent
                  onClick={() => window.open("/resume", "_blank")}
                  type="button"
                  classes="rounded-lg"
                >
                  Resume
                </ButtonComponent>
                <ButtonComponent
                  onClick={() => handleScroll("contact")}
                  type="button"
                  classes="rounded-lg"
                >
                  Contact Me
                </ButtonComponent>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
      <div
        className={`mt-10 hidden flex-row items-center justify-between sticky ${
          theme === "light" && "bg-white"
        } dark:text-white top-0 z-10 tablet:flex`}
      >
        <h1
          onClick={() => handleScroll("top")}
          className="font-medium text-2xl cursor-pointer mob:p-2 laptop:p-0"
        >
          {data.name}
        </h1>

        <div className="flex">
          <ButtonComponent
            onClick={() => handleScroll("edu")}
            type="button"
            classes="rounded-lg"
          >
            Education
          </ButtonComponent>
          <ButtonComponent
            onClick={() => handleScroll("skills")}
            type="button"
            classes="rounded-lg"
          >
            Skills
          </ButtonComponent>
          <ButtonComponent
            onClick={() => handleScroll("work")}
            type="button"
            classes="rounded-lg"
          >
            Experience
          </ButtonComponent>
          <ButtonComponent
            onClick={() => handleScroll("projects")}
            type="button"
            classes="rounded-lg"
          >
            Projects
          </ButtonComponent>
          <ButtonComponent
            onClick={() => window.open("/resume", "_blank")}
            type="button"
            classes="first:ml-1 rounded-lg"
          >
            Resume
          </ButtonComponent>

          <ButtonComponent
            onClick={() => handleScroll("contact")}
            type="button"
            classes="rounded-lg"
          >
            Contact Me
          </ButtonComponent>
          {mounted && theme && data.darkMode && (
            <ButtonComponent
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              type="button"
              classes="rounded-lg"
            >
              <img
                className={`h-6 ${animation}`}
                src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
              />
            </ButtonComponent>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
