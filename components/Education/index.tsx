import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { Button, Chip } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PlaceIcon from "@mui/icons-material/Place";
import data from "../../data/portfolio.json";
import CoursePanel from "../Course";
import AchivementPanel from "../AchivementsPanel";
import { CourseInfo } from "../../types";

function Education() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [clubsOrCourses, setClubsOrCourses] = useState(true);
  const animation = "transition-all duration-300 ease-out hover:scale-105";

  const [isCourseActive, setIsCourseActive] = useState(false);
  const [isAchievementsActive, setIsAchievementsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [achivementsInfo, setAchievementsInfo] = useState<string[]>([]);

  const [courseInfo, setCourseInfo] = useState<CourseInfo>({
    code: "",
    name: "",
    desc: [],
    link: "",
  });

  return (
    <Timeline className="max-w-5xl">
      {data.education.map((school, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent style={{ flex: 0.5 }} sx={{ m: "auto 0" }} />
          <TimelineSeparator>
            <TimelineDot sx={{ mt: 7 }} color="primary">
              <div className="group relative">
                <SchoolIcon />
                <span
                  className="absolute opacity-0 group-hover:opacity-100
                transition-opacity duration-300 bg-slate-800 text-white
                rounded-lg p-2 whitespace-nowrap left-full -translate-x-full"
                >
                  {school.start} - {school.end}
                </span>
              </div>
            </TimelineDot>
            {index < data.education.length - 1 && (
              <TimelineConnector sx={{ mt: 6 }} />
            )}
          </TimelineSeparator>
          <TimelineContent>
            <div
              className={`w-full p-2 mob:p-4 rounded-lg transition-all ease-out duration-300 ${
                mounted && theme === "dark"
                  ? "hover:bg-slate-800"
                  : "hover:bg-slate-50"
              } link`}
            >
              <h3 className="text-lg font-semibold">{school.name}</h3>
              <p className="text-sm">{school.major}</p>
              <div className="mt-2 flex flex-wrap gap-2">
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
                    className={`rounded-full ${animation}`}
                    variant="contained"
                    color="primary"
                    onClick={() => setClubsOrCourses(true)}
                  >
                    Clubs
                  </Button>
                )}
                {school.courses && school.clubs && (
                  <Button
                    className={`rounded-full px-4 py-2 ${animation}`}
                    variant="contained"
                    color="primary"
                    onClick={() => setClubsOrCourses(false)}
                  >
                    Courses
                  </Button>
                )}
                <Button
                  className={`rounded-full px-4 py-2 ${animation}`}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setIsOpen(true);
                    setIsAchievementsActive(true);
                    setAchievementsInfo(school.achievements);
                  }}
                >
                  Achievements
                </Button>
              </div>
              <div className="absolute top-1 right-2 p-2">
                <div className="group relative">
                  <PlaceIcon className="text-gray-500" />
                  <span
                    className="absolute opacity-0 group-hover:opacity-100
                transition-opacity duration-300 bg-slate-800 text-white
                rounded-lg p-2 whitespace-nowrap"
                  >
                    {school.location}
                  </span>
                </div>
              </div>
            </div>
          </TimelineContent>
        </TimelineItem>
      ))}
      {isCourseActive && (
        <CoursePanel
          courseInfo={courseInfo}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setIsActive={setIsCourseActive}
        />
      )}

      {isAchievementsActive && (
        <AchivementPanel
          achivementInfo={achivementsInfo}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setIsActive={setIsAchievementsActive}
        />
      )}
    </Timeline>
  );
}

export default Education;
