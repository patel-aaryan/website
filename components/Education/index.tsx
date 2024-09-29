import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { CourseInfo, School } from "../../data/types";

import { VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import SchoolIcon from "@mui/icons-material/School";
import { Button, Chip, Tooltip } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";

interface EducationProps {
  school: School;
  setCourseInfo: Dispatch<SetStateAction<CourseInfo>>;
  setMilestonesInfo: Dispatch<SetStateAction<string[]>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsCourseActive: Dispatch<SetStateAction<boolean>>;
  setIsMilestonesActive: Dispatch<SetStateAction<boolean>>;
}

function Education({
  school,
  setCourseInfo,
  setMilestonesInfo,
  setIsOpen,
  setIsCourseActive,
  setIsMilestonesActive,
}: EducationProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const [clubsOrCourses, setClubsOrCourses] = useState(true);
  const animation = "transition-all duration-300 ease-out hover:scale-105";

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <>
      <VerticalTimelineElement
        date={school.date}
        dateClassName="date"
        iconStyle={{ background: "#005daa" }}
        icon={<SchoolIcon />}
        contentStyle={{
          background: `${theme === "dark" ? "#121313" : "white"}`,
          boxShadow: "rgba(23, 92, 230, 0.15) 0px 4px 24px",
          border:
            theme === "dark"
              ? "1px solid rgba(255, 255, 255, 0.125)"
              : "1px solid rgba(0, 0, 0, 0.15)",
          borderRadius: "6px",
        }}
        contentArrowStyle={{
          borderRight:
            theme === "dark"
              ? "7px solid rgba(255, 255, 255, 0.3)"
              : "7px solid rgba(0, 0, 0, 0.15)",
        }}
      >
        <h1 className="text-xl font-medium w-60 tablet:w-full">
          {school.name}
        </h1>
        <h1 className="italic">{school.major}</h1>
        <h1 className="text-sm italic">{school.minor}</h1>

        <div className="absolute top-1 right-2 p-2">
          <div className="group relative">
            <Tooltip
              title={school.location}
              placement="top"
              classes={{ tooltip: "bg-slate-800 p-2 text-sm" }}
              enterTouchDelay={0}
            >
              <PlaceIcon className="text-gray-500" />
            </Tooltip>
          </div>
        </div>

        <div className="mt-2 flex justify-center flex-wrap gap-2">
          {clubsOrCourses &&
            school.clubs.map((club, idx) => (
              <Chip
                className={animation}
                key={idx}
                label={club.title}
                color="success"
                variant="filled"
              />
            ))}
          {!clubsOrCourses &&
            school.courses?.map((course, idx) => (
              <Button
                className={`rounded-full ${animation}`}
                key={idx}
                color="error"
                variant="contained"
                onClick={() => {
                  setIsOpen(true);
                  setIsCourseActive(true);
                  setCourseInfo({
                    code: course.code,
                    name: course.name,
                    desc: course.desc,
                    link: course.link,
                  });
                }}
              >
                {course.code}
              </Button>
            ))}
        </div>

        <div className="flex justify-evenly mt-4">
          {school.clubs && school.courses && (
            <Button
              className={`rounded-full ${animation} scale-90 tablet:scale-100`}
              variant="contained"
              color="primary"
              onClick={() => setClubsOrCourses(true)}
            >
              Clubs
            </Button>
          )}
          {school.courses && school.clubs && (
            <Button
              className={`rounded-full px-4 py-2 ${animation} scale-90 tablet:scale-100`}
              variant="contained"
              color="primary"
              onClick={() => setClubsOrCourses(false)}
            >
              Courses
            </Button>
          )}
          <Button
            className={`rounded-full px-4 py-2 ${animation} scale-90 tablet:scale-100`}
            variant="contained"
            color="primary"
            onClick={() => {
              setIsOpen(true);
              setIsMilestonesActive(true);
              setMilestonesInfo(school.milestones);
            }}
          >
            Milestones
          </Button>
        </div>
      </VerticalTimelineElement>
    </>
  );
}

export default Education;
