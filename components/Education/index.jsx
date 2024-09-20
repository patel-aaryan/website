// components/Timeline.js
import React, { useEffect, useState } from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import { Button, Chip } from "@mui/material";
import data from "../../data/portfolio.json";
import SchoolIcon from "@mui/icons-material/School";
import PlaceIcon from "@mui/icons-material/Place";
import { useTheme } from "next-themes";

const Education = ({ school, index }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [coursesView, setCoursesView] = useState(false);
  const [clubsView, setClubsView] = useState(true);
  const animation = "transition-all duration-300 ease-out hover:scale-105";

  return (
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
          <p className="text-sm">{school.date}</p>
          <p className="mt-2">{school.description}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {clubsView &&
              school.clubs.map((club, idx) => (
                <Chip
                  className={animation}
                  key={idx}
                  label={club.title}
                  color="primary"
                  variant="outlined"
                />
              ))}
            {coursesView &&
              school.courses?.map((course, idx) => (
                <Chip
                  className={animation}
                  key={idx}
                  label={course.code}
                  color="primary"
                  variant="outlined"
                />
              ))}
          </div>
          <div className="flex justify-evenly mt-4">
            {school.courses && (
              <Button
                className={`rounded-full px-4 py-2 tablet:text-sm tablet:px-2 tablet:py-1 ${animation}`}
                variant="contained"
                color="primary"
              >
                Courses
              </Button>
            )}

            {school.clubs && (
              <Button
                className={`rounded-full ${animation}`}
                variant="contained"
                color="primary"
              >
                Clubs
              </Button>
            )}
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
  );
};

export default Education;
