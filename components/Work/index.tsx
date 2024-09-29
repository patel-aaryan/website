import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import data from "../../data/portfolio.json";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import WorkIcon from "@mui/icons-material/Work";
import { Tooltip } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";

function Work() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <div>
      <VerticalTimeline
        animate={true}
        lineColor={`${theme === "light" ? "#121313" : "white"}`}
      >
        {data.experience.map((element, index) => {
          return (
            <VerticalTimelineElement
              key={index}
              date={element.date}
              dateClassName="date"
              iconStyle={{ background: element.colour }}
              icon={<WorkIcon />}
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
              <h1 className="text-xl font-medium">{element.title}</h1>
              <h1 className="italic">{element.company}</h1>

              <div className="absolute top-1 right-1 p-2">
                <div className="group relative">
                  <Tooltip
                    title={element.location}
                    placement="top"
                    classes={{ tooltip: "bg-slate-800 p-2 text-sm" }}
                    enterTouchDelay={0}
                  >
                    <PlaceIcon className="text-gray-500" />
                  </Tooltip>
                </div>
              </div>
              <ul className="list-disc space-y-2 pl-4 mt-4">
                {element.description.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </div>
  );
}

export default Work;
